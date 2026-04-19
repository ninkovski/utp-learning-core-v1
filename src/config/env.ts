import dotenv from 'dotenv';
import packageJson from '../../package.json';

dotenv.config();

function getEnvValue(key: 'NODE_ENV' | 'PORT' | 'JWT_SECRET' | 'DATABASE_URL', fallback?: string): string {
  const value = process.env[key] ?? fallback;

  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }

  return value;
}

export const env = {
  nodeEnv: getEnvValue('NODE_ENV', 'development'),
  port: Number(getEnvValue('PORT', '3000')),
  jwtSecret: getEnvValue('JWT_SECRET', 'dev-secret-change-in-production'),
  databaseUrl: getEnvValue('DATABASE_URL', 'file:./dev.db'),
  appVersion: process.env.APP_VERSION ?? packageJson.version,
};
