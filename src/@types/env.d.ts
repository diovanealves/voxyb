declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    ELEVENLABS_API_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_PAYMENTLINKS_PRICE_ID: string;
    NEXTAUTH_SECRET: string;
    HOST_URL: string;
    CLOUDFLARE_ENDPOINT: string;
    CLOUDFLARE_ACCESS_KEY: string;
    CLOUDFLARE_SECRET_KEY: string;
    CLOUDFLARE_ACCOUNT_ID: string;
    CLOUDFLARE_BUCKET: string;
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: string;
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string;
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: string;
  }
}
