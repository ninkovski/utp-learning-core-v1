import { app } from './app';
import { env } from './config/env';
import { prepareSqliteDatabase } from './lib/sqlite-bootstrap';

prepareSqliteDatabase();

app.listen(env.port, () => {
  console.log(`Mini LMS API listening on port ${env.port} (${env.nodeEnv})`);
});
