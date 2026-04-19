import dotenv from 'dotenv';
import packageJson from '../../package.json';

dotenv.config();

function getEnvValue(key: 'NODE_ENV' | 'PORT' | 'JWT_SECRET' | 'DATABASE_URL', fallback?: string): string {
  const value = process.env[key] ?? fallback;

  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }

  if (!process.env[key]) {
    process.env[key] = value;
  }

  return value;
}

function getDefaultDatabaseUrl(nodeEnv: string): string {
  if (nodeEnv === 'production') {
    return 'file:/home/site/data/dev.db';
  }

  return 'file:./dev.db';
}

function isAzureAppService(): boolean {
  return Boolean(process.env.WEBSITE_SITE_NAME || process.env.WEBSITE_INSTANCE_ID);
}

const nodeEnv = getEnvValue('NODE_ENV', isAzureAppService() ? 'production' : 'development');

export const env = {
  nodeEnv,
  port: Number(getEnvValue('PORT', '3000')),
  jwtSecret: getEnvValue('JWT_SECRET', 'dev-secret-change-in-production'),
  databaseUrl: getEnvValue('DATABASE_URL', getDefaultDatabaseUrl(nodeEnv)),
  appVersion: process.env.APP_VERSION ?? packageJson.version,
};
