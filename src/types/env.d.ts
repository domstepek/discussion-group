declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PUSHER_APP_ID: string;
      PUSHER_KEY: string;
      PUSHER_SECRET: string;
      PUSHER_CLUSTER: string;
    }
  }
}
