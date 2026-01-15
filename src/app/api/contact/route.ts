import { Resend } from "resend";

export const runtime = "nodejs"; // IMPORTANT for Resend

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400 }
      );
    }

    // ✅ Initialize Resend INSIDE the handler
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "WFMClubs <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL!],
      subject: "New Contact Query – WFMClubs",
      replyTo: email,
      html: `
        <h2>New Contact Query</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500 }
    );
  }
}
