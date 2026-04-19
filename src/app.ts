import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler } from './common/middleware/error-handler';
import { notFoundHandler } from './common/middleware/not-found';
import { apiRouter } from './routes';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Mini LMS API is running',
  });
});

app.use('/api', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
