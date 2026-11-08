export interface Env {
  // Bindings
  ASSETS: Fetcher;
  RATE_LIMIT_KV: KVNamespace;

  // Vars
  ENVIRONMENT: "development" | "production";
  API_BASE_URL: string;
  CHECKOUT_BASE_URL: string;

  // Secrets
  FIREBASE_SERVICE_ACCOUNT_JSON: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_DATABASE_URL: string;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  ADMIN_EMAILS: string;
}