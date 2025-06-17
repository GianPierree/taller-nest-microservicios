/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const serverlessExpress = require('@vendia/serverless-express');

let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors(); // Habilitar CORS si es necesario
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance() as express.Express;
  server = serverlessExpress({ app: expressApp });
}

export const handler = async (event: any, context: any, callback: any) => {
  if (!server) {
    await bootstrap();
  }
  return server(event, context, callback);
};
