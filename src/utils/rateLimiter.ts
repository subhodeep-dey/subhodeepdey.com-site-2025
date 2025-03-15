interface RateLimitRecord {
  count: number;
  resetTime: number;
}

type RateLimitStore = {
  [key: string]: RateLimitRecord;
};

/**
 * A simple in-memory rate limiter
 * Note: For production, use a persistent store like Redis
 */
class RateLimiter {
  private store: RateLimitStore = {};
  private readonly maxRequests: number;
  private readonly windowMs: number;

  /**
   * Creates a new rate limiter
   * @param maxRequests Maximum number of requests allowed in the time window
   * @param windowMs Time window in milliseconds
   */
  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    
    // Clean up expired records every hour
    setInterval(() => this.cleanUp(), 3600000);
  }

  /**
   * Checks if a key has exceeded the rate limit
   * @param key The key to check (e.g., IP address or email)
   * @returns Boolean indicating if the rate limit has been exceeded
   */
  isRateLimited(key: string): boolean {
    const now = Date.now();
    
    // Initialize record if it doesn't exist
    if (!this.store[key]) {
      this.store[key] = {
        count: 0,
        resetTime: now + this.windowMs
      };
    }
    
    const record = this.store[key];
    
    // Reset count if the time window has passed
    if (now > record.resetTime) {
      record.count = 0;
      record.resetTime = now + this.windowMs;
    }
    
    // Increment count and check if limit exceeded
    record.count += 1;
    return record.count > this.maxRequests;
  }
  
  /**
   * Gets the remaining requests for a key
   * @param key The key to check
   * @returns Number of remaining requests
   */
  getRemainingRequests(key: string): number {
    if (!this.store[key]) {
      return this.maxRequests;
    }
    
    const record = this.store[key];
    const now = Date.now();
    
    // Reset count if the time window has passed
    if (now > record.resetTime) {
      record.count = 0;
      record.resetTime = now + this.windowMs;
      return this.maxRequests;
    }
    
    return Math.max(0, this.maxRequests - record.count);
  }
  
  /**
   * Gets the time remaining until the rate limit resets
   * @param key The key to check
   * @returns Time in milliseconds until reset
   */
  getTimeUntilReset(key: string): number {
    if (!this.store[key]) {
      return 0;
    }
    
    const record = this.store[key];
    const now = Date.now();
    
    return Math.max(0, record.resetTime - now);
  }
  
  /**
   * Cleans up expired records
   */
  private cleanUp(): void {
    const now = Date.now();
    
    Object.keys(this.store).forEach(key => {
      if (now > this.store[key].resetTime) {
        delete this.store[key];
      }
    });
  }
}

// Create rate limiter instances
export const contactFormLimiter = new RateLimiter(10, 60 * 60 * 1000); // 10 requests per hour
export const newsletterLimiter = new RateLimiter(5, 60 * 60 * 1000); // 5 requests per hour

export default RateLimiter;