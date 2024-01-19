import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const HOST_NAME = process.env.HOST_NAME || "127.0.0.1";
export const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/blinkit";
export const JWT_SECRET = process.env.JWT_SECRET;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
