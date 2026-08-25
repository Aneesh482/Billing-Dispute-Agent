import dotenv from "dotenv";
dotenv.config();

function required(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}

export const settings = {
  GOOGLE_CLIENT_ID: required("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: required("GOOGLE_CLIENT_SECRET"),
  GEMINI_API_KEY: required("GEMINI_API_KEY"),
  SESSION_SECRET_KEY: required("SESSION_SECRET_KEY"),
  TOKEN_ENCRYPTION_KEY: required("TOKEN_ENCRYPTION_KEY"),
  FRONTEND_URL: required("FRONTEND_URL"),
  GCP_PROJECT_ID: required("GCP_PROJECT_ID"),
  ENVIRONMENT: process.env.ENVIRONMENT ?? "development",
  BACKEND_URL: required("BACKEND_URL"),
};
