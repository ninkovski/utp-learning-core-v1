import fs from 'fs';
import path from 'path';

import { env } from '../config/env';

function getFilePathFromPrismaUrl(databaseUrl: string): string | null {
  if (!databaseUrl.startsWith('file:')) {
    return null;
  }

  const rawPath = databaseUrl.slice('file:'.length);

  if (path.isAbsolute(rawPath)) {
    return rawPath;
  }

  return path.resolve(process.cwd(), rawPath);
}

export function prepareSqliteDatabase(): void {
  const databasePath = getFilePathFromPrismaUrl(env.databaseUrl);

  if (!databasePath) {
    return;
  }

  fs.mkdirSync(path.dirname(databasePath), { recursive: true });

  if (fs.existsSync(databasePath)) {
    return;
  }

  const templateDatabasePath = path.resolve(process.cwd(), 'prisma', 'dev.db');

  if (!fs.existsSync(templateDatabasePath)) {
    return;
  }

  fs.copyFileSync(templateDatabasePath, databasePath);
}
