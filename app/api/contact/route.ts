import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // 1. Destructure 'type' along with the other fields
    // type will be either 'contact' or 'consultation'
    const { name, email, request, type } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alloyedtech@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // --- LOGIC SWITCHER ---
    let adminSubject = "";
    let adminHeader = "";
    let userSubject = "";
    let userMessageHtml = "";

    if (type === 'consultation') {
      // CASE A: BOOKING CONSULTATION
      adminSubject = `📅 NEW CONSULTATION REQUEST: ${name}`;
      adminHeader = "New Consultation Booking";
      userSubject = "Consultation Request Received - Alloyed";
      
      // Professional message you requested
      userMessageHtml = `
        <h2 style="color: #2563eb;">Request Received</h2>
        <p>Dear ${name},</p>
        <p>Thank you for choosing <strong>Alloyed</strong>.</p>
        <p style="font-size: 16px;">
          We have successfully received your inquiry. <strong>We will schedule your free consultation with our professionals very soon.</strong>
        </p>
        <p>You will receive a calendar invitation shortly confirming the specific details.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>The Alloyed Team</strong></p>
      `;

    } else {
      // CASE B: STANDARD CONTACT FORM
      adminSubject = `📩 New Project Inquiry from ${name}`;
      adminHeader = "New Project Request";
      userSubject = "We received your request - Alloyed";
      
      // Standard "We'll get back to you" message
      userMessageHtml = `
        <h2 style="color: #2563eb;">Thank you for contacting Alloyed.</h2>
        <p>Hi ${name},</p>
        <p>We have received your project inquiry and our team is reviewing it.</p>
        <p>We will get back to you shortly to discuss how we can help forge your vision.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>The Alloyed Team</strong></p>
      `;
    }

    // 2. Email to Admin (YOU)
    await transporter.sendMail({
      from: `"Alloyed Website" <alloyedtech@gmail.com>`,
      to: 'alloyedtech@gmail.com',
      subject: adminSubject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h3 style="color: #2563eb;">${adminHeader}</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #2563eb;">
            <strong>Details:</strong><br/>
            ${request ? request.replace(/\n/g, '<br/>') : 'No details provided.'}
          </div>
        </div>
      `,
    });

    // 3. Auto-Reply to User
    await transporter.sendMail({
      from: `"Alloyed Team" <alloyedtech@gmail.com>`,
      to: email,
      subject: userSubject,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; line-height: 1.6; max-width: 600px;">
          ${userMessageHtml}
        </div>
      `,
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}