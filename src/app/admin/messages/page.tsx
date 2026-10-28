import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { connectDB } from "@/lib/mongodb";
import { ContactMessageModel } from "@/models/ContactMessage";
import { MessagesManager } from "./MessagesManager";

export default async function AdminMessagesPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let messages = [];
  try {
    await connectDB();
    const docs = await ContactMessageModel.find().sort({ createdAt: -1 }).lean();
    messages = JSON.parse(JSON.stringify(docs));
  } catch (err) {
    console.warn("Could not retrieve messages:", err);
  }

  return (
    <div className="space-y-8">
      <div className="border-b-3 border-[#111111] pb-6">
        <div className="font-mono text-xs uppercase text-[#FF5722] font-bold">
          COMMUNICATION // DISPATCH INBOX
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl uppercase font-black text-[#111111]">
          Inquiries & Contact Leads
        </h1>
        <p className="font-sans text-sm text-[#555555] mt-1">
          Review submissions originating from the portfolio contact dispatch form.
        </p>
      </div>

      <MessagesManager initialMessages={messages} />
    </div>
  );
}

