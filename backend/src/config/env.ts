import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Robustly locate .env file from possible locations
const candidateEnvPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../../.env')
];

for (const envPath of candidateEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}
dotenv.config(); // fallback default

export const CONFIG = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  GEMINI_MODEL: process.env.GEMINI_MODEL || process.env.VITE_GEMINI_MODEL || 'gemini-3.5-flash-lite',
  GEMINI_API_KEYS: process.env.GEMINI_API_KEYS || process.env.VITE_GEMINI_API_KEYS || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '',
  EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID || '',
  EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID || '',
  EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY || '',
  EMAILJS_PRIVATE_KEY: process.env.EMAILJS_PRIVATE_KEY || '',
  CONTACT_EMAIL_RECEIVER: process.env.CONTACT_EMAIL_RECEIVER || 'petermisik86@gmil.com'
};
