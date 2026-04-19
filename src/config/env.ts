import dotenv from 'dotenv';

dotenv.config();

function getEnvValue(key: 'NODE_ENV' | 'PORT', fallback?: string): string {
  const value = process.env[key] ?? fallback;

  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }

  return value;
}

export const env = {
  nodeEnv: getEnvValue('NODE_ENV', 'development'),
  port: Number(getEnvValue('PORT', '3000')),
};
