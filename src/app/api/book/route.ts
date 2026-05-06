import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

/* ─── Email subject builder ─── */
function buildSubject(purpose: string, name: string): string {
  const typeLabel =
    purpose === "inquiry"
      ? "Professional Inquiry"
      : purpose === "insights"
        ? "Personalized Insights"
        : "Private Session";

  return `Nova Arcana - ${typeLabel} - ${name}`;
}

/* ─── Email body builder ─── */
function buildHtmlBody(data: Record<string, string>): string {
  const purposeLabel =
    data.purpose === "inquiry"
      ? "Professional Inquiry"
      : data.purpose === "insights"
        ? "Personalized Insights"
        : "Private Session";

  const platformLabel =
    data.sessionPlatform === "whatsapp"
      ? "WhatsApp"
      : data.sessionPlatform === "zoom"
        ? "Zoom"
        : data.sessionPlatform === "meet"
          ? "Google Meet"
          : "";

  let detailsHtml = "";

  if (data.purpose === "inquiry") {
    detailsHtml = `
      <tr><td style="padding:8px 12px;font-weight:600;color:#555;width:160px">Inquiry</td>
          <td style="padding:8px 12px">${data.inquiryText || "-"}</td></tr>`;
  }

  if (data.purpose === "insights") {
    detailsHtml = `
      <tr><td style="padding:8px 12px;font-weight:600;color:#555;width:160px">Format</td>
          <td style="padding:8px 12px">${data.insightFormat?.toUpperCase() || "-"}</td></tr>
      <tr><td style="padding:8px 12px;font-weight:600;color:#555">Specifications</td>
          <td style="padding:8px 12px">${data.insightComment || "None"}</td></tr>`;
  }

  if (data.purpose === "session") {
    detailsHtml = `
      <tr><td style="padding:8px 12px;font-weight:600;color:#555;width:160px">Platform</td>
          <td style="padding:8px 12px">${platformLabel || "-"}</td></tr>
      ${data.phoneNumber ? `<tr><td style="padding:8px 12px;font-weight:600;color:#555">Phone Number</td><td style="padding:8px 12px">${data.phoneNumber}</td></tr>` : ""}
      <tr><td style="padding:8px 12px;font-weight:600;color:#555">Comments</td>
          <td style="padding:8px 12px">${data.sessionComment || "None"}</td></tr>`;
  }

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#222">
      <div style="background:#b45309;padding:20px 24px;border-radius:8px 8px 0 0">
        <h1 style="margin:0;color:#fff;font-size:20px">New Booking Request</h1>
        <p style="margin:4px 0 0;color:#fde68a;font-size:13px">Nova Arcana LLC</p>
      </div>
      <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:20px 24px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 12px;font-weight:600;color:#555;width:160px">Name</td>
              <td style="padding:8px 12px">${data.name}</td></tr>
          <tr style="background:#f9fafb"><td style="padding:8px 12px;font-weight:600;color:#555">Date of Birth</td>
              <td style="padding:8px 12px">${data.dateOfBirth}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600;color:#555">Country</td>
              <td style="padding:8px 12px">${data.country}</td></tr>
          <tr style="background:#f9fafb"><td style="padding:8px 12px;font-weight:600;color:#555">Purpose</td>
              <td style="padding:8px 12px">${purposeLabel}</td></tr>
          ${detailsHtml}
          <tr><td style="padding:8px 12px;font-weight:600;color:#555">Submitted</td>
              <td style="padding:8px 12px">${new Date().toLocaleString()}</td></tr>
        </table>
      </div>
      <p style="text-align:center;font-size:11px;color:#9ca3af;margin-top:16px">
        This booking was submitted through the Nova Arcana LLC website.
      </p>
    </div>`;
}

export async function POST(req: NextRequest) {
  try {
    const body: Record<string, string> = await req.json();

    /* ── Validate required fields ── */
    const { name, dateOfBirth, country, purpose } = body;
    if (!name || !dateOfBirth || !country || !purpose) {
      return NextResponse.json(
        { error: "Missing required fields: name, dateOfBirth, country, purpose" },
        { status: 400 },
      );
    }

    if (!["inquiry", "insights", "session"].includes(purpose)) {
      return NextResponse.json(
        { error: "Invalid purpose value" },
        { status: 400 },
      );
    }

    /* ── Save to database ── */
    const booking = await db.booking.create({
      data: {
        name,
        dateOfBirth,
        country,
        purpose,
        inquiryText: body.inquiryText || null,
        insightFormat: body.insightFormat || null,
        insightComment: body.insightComment || null,
        sessionPlatform: body.sessionPlatform || null,
        phoneNumber: body.phoneNumber || null,
        sessionComment: body.sessionComment || null,
      },
    });

    /* ── Send email notification ── */
    let emailSent = false;
    const recipientEmail = "med.taha.khaldi@gmail.com";

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER || "",
          pass: process.env.SMTP_PASS || "",
        },
      });

      const subject = buildSubject(purpose, name);
      const html = buildHtmlBody(body);

      await transporter.sendMail({
        from: `"Nova Arcana LLC" <${process.env.SMTP_USER || "noreply@novaarcana.com"}>`,
        to: recipientEmail,
        subject,
        html,
      });

      emailSent = true;

      // Update booking record
      await db.booking.update({
        where: { id: booking.id },
        data: { emailSent: true },
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      // Booking is still saved even if email fails
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      emailSent,
    });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
