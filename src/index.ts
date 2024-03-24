import 'reflect-metadata';
import 'dotenv/config';

import { InversifyExpressServer } from 'inversify-express-utils';
import container from './container';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { authMiddleware } from './adapters/api/middlewares/auth.middleware';

const PORT = process.env.APP_PORT || 4568;
const server = new InversifyExpressServer(container, null, {
  rootPath: '/api',
});

server.setConfig((app) => {
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use(authMiddleware);
});

server.build().listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
