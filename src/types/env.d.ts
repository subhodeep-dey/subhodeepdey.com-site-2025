declare namespace NodeJS {
  interface ProcessEnv {
    // hCaptcha
    NEXT_PUBLIC_HCAPTCHA_SITE_KEY: string;
    HCAPTCHA_SECRET_KEY: string;

    // SMTP
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;

    // Email
    EMAIL_FROM: string;
    EMAIL_TO: string;

    // Social media links
    NEXT_PUBLIC_INSTAGRAM_URL: string;
    NEXT_PUBLIC_GITHUB_URL: string;
    NEXT_PUBLIC_LINKEDIN_URL: string;
    NEXT_PUBLIC_TWITTER_URL: string;
    NEXT_PUBLIC_YOUTUBE_URL: string;

    // Last updated date
    NEXT_PUBLIC_LAST_UPDATED: string;

    // Map link
    NEXT_PUBLIC_MAP_URL: string;
  }
}