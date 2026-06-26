import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function clean(value: unknown) {
  return String(value || "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    const email = clean(body.email).toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Podaj poprawny adres e-mail." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const contactTo = process.env.CONTACT_TO || process.env.RECEIVER_EMAIL || "office@fluxbase.pl";

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
      auth: { user: smtpUser, pass: smtpPass },
    });

    const safeEmail = escapeHtml(email);

    await transporter.sendMail({
      from: `FluxBase newsletter <${smtpUser}>`,
      to: contactTo,
      replyTo: email,
      subject: "Nowy zapis do newslettera FluxBase",
      text: `Nowy zapis do newslettera FluxBase:\n\n${email}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#050812;color:#f7f8ff;padding:28px;border-radius:18px;line-height:1.6">
          <h2 style="margin:0 0 16px;color:#ffffff">Nowy zapis do newslettera</h2>
          <p><strong>E-mail:</strong> ${safeEmail}</p>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `FluxBase <${smtpUser}>`,
      to: email,
      replyTo: contactTo,
      subject: "Zapis do newslettera FluxBase",
      text:
        "Dzięki za zapis do newslettera FluxBase.\n\n" +
        "Aby zrezygnować, napisz na office@fluxbase.pl z prośbą o usunięcie adresu z listy.",
      html: `
        <div style="font-family:Arial,sans-serif;background:#050812;color:#f7f8ff;padding:28px;border-radius:18px;line-height:1.6">
          <h2 style="margin:0 0 16px;color:#ffffff">Dzięki za zapis ✦</h2>
          <p>Twój adres został zapisany do newslettera FluxBase.</p>
          <p style="color:#b8c0d9">Aby zrezygnować, napisz na office@fluxbase.pl z prośbą o usunięcie adresu z listy.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Nie udało się zapisać do newslettera. Spróbuj ponownie później." },
      { status: 500 }
    );
  }
}
