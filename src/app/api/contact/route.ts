import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { isValidEmail, isValidName, isValidMessage, sanitizeInput } from '@/utils/validation';
import { contactFormLimiter } from '@/utils/rateLimiter';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown-ip';

    // Check rate limit
    if (contactFormLimiter.isRateLimited(ip)) {
      const resetTime = Math.ceil(contactFormLimiter.getTimeUntilReset(ip) / 1000 / 60);
      return NextResponse.json(
        {
          error: `Rate limit exceeded. Please try again in ${resetTime} minutes.`,
          rateLimited: true,
          resetTime
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    let { firstName, lastName, email, message } = body;
    const { captchaToken } = body;

    // Sanitize inputs
    firstName = sanitizeInput(firstName);
    lastName = sanitizeInput(lastName);
    email = sanitizeInput(email);
    message = sanitizeInput(message);

    // Combine first and last name
    const name = `${firstName} ${lastName}`;

    // Validate form inputs
    if (!firstName || !lastName || !email || !message || !captchaToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate first name
    if (!isValidName(firstName)) {
      return NextResponse.json(
        { error: 'First name must be at least 2 characters and contain only letters, spaces, hyphens, and apostrophes' },
        { status: 400 }
      );
    }

    // Validate last name
    if (!isValidName(lastName)) {
      return NextResponse.json(
        { error: 'Last name must be at least 2 characters and contain only letters, spaces, hyphens, and apostrophes' },
        { status: 400 }
      );
    }

    // Validate message
    if (!isValidMessage(message)) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Verify hCaptcha token
    const verificationResponse = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY || '',
        response: captchaToken,
      }),
    });

    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
      return NextResponse.json(
        { error: 'Captcha verification failed' },
        { status: 400 }
      );
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}

        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Get remaining requests for the response header
    const remainingRequests = contactFormLimiter.getRemainingRequests(ip);

    const response = NextResponse.json({
      success: true,
      remainingRequests
    });

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', '10');
    response.headers.set('X-RateLimit-Remaining', String(remainingRequests));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil(contactFormLimiter.getTimeUntilReset(ip) / 1000)));

    return response;
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}