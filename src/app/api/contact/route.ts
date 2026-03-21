import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await req.json();
    const { firstName, lastName, email, phone, interest, message } = body;

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Wande Realty <onboarding@resend.dev>",
      to: ["info@wanderealty.com"],
      replyTo: email,
      subject: `New Enquiry: ${interest || "General"} — ${firstName} ${lastName || ""}`.trim(),
      html: `
        <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; color: #1c2340;">
          <div style="border-bottom: 2px solid #c49a3c; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="font-size: 20px; font-weight: 300; margin: 0;">New Website Enquiry</h1>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #8b91a8; width: 120px;">Name</td>
              <td style="padding: 8px 0; font-weight: 500;">${firstName} ${lastName || ""}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8b91a8;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2e4480;">${email}</a></td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 8px 0; color: #8b91a8;">Phone</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #2e4480;">${phone}</a></td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #8b91a8;">Interest</td>
              <td style="padding: 8px 0;">${interest || "General enquiry"}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 20px; background: #f8f7f4; border-left: 3px solid #c49a3c;">
            <p style="margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #8b91a8;">Message</p>
            <p style="margin: 0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="margin-top: 32px; font-size: 11px; color: #8b91a8;">
            This enquiry was submitted via wanderealty.com
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
