import nodemailer from "nodemailer";

const services = [
  "Blockchain AML Programs",
  "Crypto Wallet Tracking",
  "Transaction Monitoring (CDD/EDD)",
  "PEP Screening & RBO Verification",
  "Regulatory Alignment",
  "AML Risk Assessment",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const service = String(body.service || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email) {
    return Response.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }
  if (service && !services.includes(service)) {
    return Response.json({ error: "Invalid service selected." }, { status: 400 });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error("Missing GMAIL_USER / GMAIL_APP_PASSWORD environment variables.");
    return Response.json(
      { error: "Email service is not configured yet." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const subject = `New Consultation Request${service ? ` — ${service}` : ""}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="margin-bottom: 4px;">New Contact Form Submission</h2>
      <p style="color:#666; margin-top: 0;">via mbi-aml-consulting.com contact form</p>
      <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding:8px 0; color:#666; width:120px;">Name</td><td style="padding:8px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
        <tr><td style="padding:8px 0; color:#666;">Email</td><td style="padding:8px 0;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:8px 0; color:#666;">Phone</td><td style="padding:8px 0;">${escapeHtml(phone || "N/A")}</td></tr>
        <tr><td style="padding:8px 0; color:#666;">Service</td><td style="padding:8px 0;">${escapeHtml(service || "N/A")}</td></tr>
      </table>
      <p style="color:#666; margin-top: 20px; margin-bottom: 4px;">Message</p>
      <p style="white-space: pre-wrap; border-left: 3px solid #ddd; padding-left: 12px;">${escapeHtml(message || "N/A")}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"MBI AML Consulting Website" <${process.env.GMAIL_USER}>`,
      to: "Mbiojong06@gmail.com",
      replyTo: email,
      subject,
      html,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return Response.json(
      { error: "Failed to send your message. Please try again later." },
      { status: 502 }
    );
  }
}
