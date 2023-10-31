declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PGDATABASE: string;
      PGHOST: string;
      PGPASSWORD: string;
      PGPORT: string;
      PGUSER: string;
      REDIS_URL: string;
      GOOGLE_APPLICATION_CREDENTIALS: string;
      OPENAI_SECRET: string;
      SESSION_SECRET: string;
      PORT: string;
      CORS_ORIGIN: string;
      GOOGLE_AUTH_CLIENT_SECRET: string;
      GOOGLE_AUTH_CLIENT_ID: string;
      GOOGLE_AUTH_REDIRECT_URL: string;
    }
  }
}

export {};
