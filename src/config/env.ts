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

function getDefaultDatabaseUrl(nodeEnv: string): string {
  if (nodeEnv === 'production') {
    return 'file:/home/site/data/dev.db';
  }

  return 'file:./dev.db';
}

const nodeEnv = getEnvValue('NODE_ENV', 'development');

export const env = {
  nodeEnv,
  port: Number(getEnvValue('PORT', '3000')),
  jwtSecret: getEnvValue('JWT_SECRET', 'dev-secret-change-in-production'),
  databaseUrl: getEnvValue('DATABASE_URL', getDefaultDatabaseUrl(nodeEnv)),
  appVersion: process.env.APP_VERSION ?? packageJson.version,
};
