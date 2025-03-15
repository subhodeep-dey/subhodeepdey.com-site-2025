/**
 * Validates an email address format
 * @param email The email address to validate
 * @returns Boolean indicating if the email is valid
 */
export function isValidEmail(email: string): boolean {
  // RFC 5322 compliant email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email.trim());
}

/**
 * Sanitizes a string by removing potentially harmful characters
 * @param input The string to sanitize
 * @returns The sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove HTML tags and trim whitespace
  return input
    .replace(/<[^>]*>/g, '')
    .trim();
}

/**
 * Validates the name field
 * @param name The name to validate
 * @returns Boolean indicating if the name is valid
 */
export function isValidName(name: string): boolean {
  // Name should be at least 2 characters and not contain special characters except spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']{2,}$/;
  return nameRegex.test(name.trim());
}

/**
 * Validates the message field
 * @param message The message to validate
 * @returns Boolean indicating if the message is valid
 */
export function isValidMessage(message: string): boolean {
  // Message should be at least 10 characters
  return message.trim().length >= 10;
}