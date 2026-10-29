import nodemailer from "nodemailer";

interface EmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail({ name, email, subject, message }: EmailPayload) {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT) || 587;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  const recipient = process.env.CONTACT_EMAIL || user || "arijit.barua.turza@g.bracu.ac.bd";

  // Check if SMTP is configured
  if (!host || !user || !pass || !recipient) {
    console.warn("SMTP configuration not fully set in environment variables. Message will be stored in database only.");
    return {
      sent: false,
      reason: "SMTP_NOT_CONFIGURED",
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"${name} (Portfolio Inquiry)" <${user}>`,
    replyTo: email,
    to: recipient,
    subject: `[Portfolio Inquiry] ${subject}`,
    text: `New contact submission received from ${name} (${email}):\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: monospace; background: #FFFBEA; color: #111111; padding: 24px; border: 2px solid #111111;">
        <h2 style="text-transform: uppercase; margin-top: 0; border-bottom: 2px solid #111111; padding-bottom: 8px;">
          New Portfolio Inquiry
        </h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr style="border: none; border-top: 1px dashed #111111; margin: 16px 0;" />
        <div style="background: #FFFFFF; padding: 16px; border: 1px solid #111111; white-space: pre-wrap;">
          ${message}
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { sent: true };
  } catch (error: any) {
    console.error("Nodemailer dispatch error:", error);
    return {
      sent: false,
      reason: error?.message || "DISPATCH_FAILED",
    };
  }
}

