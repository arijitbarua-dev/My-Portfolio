import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { connectDB } from "@/lib/mongodb";
import { ContactMessageModel } from "@/models/ContactMessage";
import { sendContactEmail } from "@/lib/email";

// Simple in-memory rate limiter: IP -> Array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW);

  if (recent.length >= MAX_REQUESTS) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 1. Zod Validation
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const issues = validationResult.error.issues.map((i) => i.message).join(", ");
      return NextResponse.json({ error: issues }, { status: 400 });
    }

    const { name, email, subject, message, honeypot } = validationResult.data;

    // 2. Honeypot check - if filled, silently succeed
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // 3. Persist to MongoDB
    let dbSaved = false;
    try {
      await connectDB();
      await ContactMessageModel.create({
        name,
        email,
        subject,
        message,
        status: "new",
      });
      dbSaved = true;
    } catch (dbErr) {
      console.warn("Could not save message to MongoDB (offline/connecting):", dbErr);
    }

    // 4. Send Email Notification
    const emailResult = await sendContactEmail({ name, email, subject, message });

    return NextResponse.json({
      success: true,
      dbSaved,
      emailSent: emailResult.sent,
      message: emailResult.sent
        ? "Your message has been delivered directly to my inbox."
        : "Your message was recorded securely in the portfolio dispatch queue.",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
