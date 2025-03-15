# Contact Form with hCaptcha, SMTP, and Rate Limiting

This document provides instructions on how to set up and use the contact form with hCaptcha, SMTP email functionality, input validation, and rate limiting.

## Features

- Comprehensive form validation (client-side and server-side)
- Input sanitization to prevent malicious content
- Rate limiting (10 submissions per hour per IP)
- hCaptcha integration for bot protection
- SMTP email sending via Brevo (formerly Sendinblue)
- Dark mode support for hCaptcha
- Responsive design
- Accessibility improvements with ARIA attributes
- Real-time validation feedback

## Setup

### Environment Variables

The following environment variables need to be set in your `.env` file:

```
# hCaptcha credentials
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key

# Brevo SMTP credentials
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_smtp_password

# Email configuration
EMAIL_FROM=your_email@example.com
EMAIL_TO=recipient_email@example.com
```

### Dependencies

The following dependencies are required:

```
npm install nodemailer @hcaptcha/types
npm install -D @types/nodemailer
```

Or if you're using yarn:

```
yarn add nodemailer @hcaptcha/types
yarn add -D @types/nodemailer
```

## How It Works

1. The contact form collects user input (name, email, message)
2. Input is validated in real-time as the user types
3. hCaptcha verifies that the user is not a bot
4. The form data is sent to the API route `/api/contact`
5. The API route checks rate limits (10 submissions per hour per IP)
6. The API route sanitizes and validates all inputs
7. The API route verifies the hCaptcha token
8. If all checks pass, the email is sent via SMTP
9. A success or error message is displayed to the user
10. The remaining submission count is updated

## Testing

For testing purposes, you can use the hCaptcha test keys:

- Site Key: `10000000-ffff-ffff-ffff-000000000001`
- Secret Key: `0x0000000000000000000000000000000000000000`

These keys will always pass verification without showing a challenge.

## Troubleshooting

### hCaptcha Not Loading

If hCaptcha is not loading, check the following:

1. Ensure the site key is correctly set in the `.env` file
2. Check the browser console for any errors
3. Make sure you're not using localhost (use a hosts file entry as described in hCaptcha docs)

### Emails Not Sending

If emails are not being sent, check the following:

1. Verify your SMTP credentials in the `.env` file
2. Check if your SMTP provider has any sending limits
3. Look for any error messages in the server logs

### Rate Limiting Issues

If you're experiencing rate limiting issues:

1. The rate limiter is set to 10 submissions per hour per IP address
2. For testing, you can modify the limits in `src/utils/rateLimiter.ts`
3. In production, consider using a persistent store like Redis instead of the in-memory store
4. The rate limiter will automatically reset after one hour

### Validation Errors

If form validation is failing:

1. Name must be at least 2 characters and contain only letters, spaces, hyphens, and apostrophes
2. Email must be in a valid format (RFC 5322 compliant)
3. Message must be at least 10 characters long
4. All inputs are sanitized to remove HTML tags and trim whitespace

## Production Deployment

For production deployment:

1. Replace the test hCaptcha keys with your production keys
2. Ensure your SMTP credentials are securely stored
3. Consider replacing the in-memory rate limiter with a persistent store like Redis
4. Adjust the rate limit settings as needed for your use case
5. Implement additional security measures like CORS protection
6. Consider adding logging for form submissions and rate limit events

## Additional Resources

- [hCaptcha Documentation](https://docs.hcaptcha.com/)
- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Brevo SMTP Documentation](https://help.brevo.com/hc/en-us/articles/209462765-What-is-Brevo-SMTP-)
- [RFC 5322 Email Validation](https://datatracker.ietf.org/doc/html/rfc5322)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)