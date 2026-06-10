import { Resend } from "resend";

type SendContactEmailInput = {
  ownerEmail: string;
  fromEmail: string;
  subject: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendContactEmail(input: SendContactEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { sent: false, skipped: true };
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const subject = `[Portfolio] ${input.subject}`;
  const safeMessage = escapeHtml(input.message).replace(/\n/g, "<br />");
  const safeEmail = escapeHtml(input.fromEmail);

  await resend.emails.send({
    from,
    to: input.ownerEmail,
    replyTo: input.fromEmail,
    subject,
    text: `From: ${input.fromEmail}\n\n${input.message}`,
    html: `<p><strong>From:</strong> ${safeEmail}</p><p>${safeMessage}</p>`,
  });

  return { sent: true, skipped: false };
}
