import * as dotenv from "dotenv";

dotenv.config();

export const API_URL = process.env.REACT_APP_API_URL;
export const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
export const BUCKET_REGION = process.env.REACT_APP_BUCKET_REGION;
export const S3_KEY = process.env.REACT_APP_S3_KEY;
export const BUCKET_NAME = process.env.REACT_APP_BUCKET_NAME;
export const S3_SECRET = process.env.REACT_APP_S3_SECRET;
