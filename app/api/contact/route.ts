import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function clean(value: unknown) {
  return String(value || "").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const phone = clean(body.phone);
    const message = clean(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Uzupełnij imię, e-mail i wiadomość." },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json(
        { error: "Podaj poprawny adres e-mail." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const receiver = process.env.CONTACT_TO || process.env.RECEIVER_EMAIL || "office@fluxbase.pl";

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "Brakuje konfiguracji SMTP w zmiennych środowiskowych." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Nie podano");
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
      from: `FluxBase formularz <${smtpUser}>`,
      to: receiver,
      replyTo: email,
      subject: `Nowe zapytanie ze strony FluxBase - ${name}`,
      text:
        `Nowe zapytanie ze strony FluxBase\n\n` +
        `Imię/firma: ${name}\n` +
        `E-mail: ${email}\n` +
        `Telefon: ${phone || "Nie podano"}\n\n` +
        `Wiadomość:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#050711;color:#f8f9ff;padding:28px;border-radius:18px;line-height:1.6">
          <h2 style="margin:0 0 16px;color:#fff">Nowe zapytanie ze strony FluxBase</h2>
          <p><strong>Imię/firma:</strong> ${safeName}</p>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
          <p><strong>Telefon:</strong> ${safePhone}</p>
          <div style="margin-top:18px;padding:18px;border:1px solid rgba(255,255,255,.16);border-radius:14px;background:rgba(255,255,255,.06)">
            <strong>Wiadomość:</strong>
            <p style="white-space:pre-wrap;margin-bottom:0">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `FluxBase <${smtpUser}>`,
      to: email,
      replyTo: receiver,
      subject: "Dzięki za kontakt z FluxBase",
      text:
        `Cześć ${name},\n\n` +
        `Dzięki za wiadomość. Otrzymaliśmy Twoje zapytanie i odezwiemy się możliwie szybko.\n\n` +
        `FluxBase\noffice@fluxbase.pl\n+48 694 873 748`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#050711;color:#f8f9ff;padding:28px;border-radius:18px;line-height:1.6">
          <h2 style="margin:0 0 16px;color:#fff">Dzięki za kontakt ✦</h2>
          <p>Cześć ${safeName},</p>
          <p>Otrzymaliśmy Twoje zapytanie i odezwiemy się możliwie szybko.</p>
          <p style="margin-top:24px;color:#b8c0d9">FluxBase<br/>office@fluxbase.pl<br/>+48 694 873 748</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później." },
      { status: 500 }
    );
  }
}
