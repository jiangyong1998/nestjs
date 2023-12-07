import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NextFunction, Request, Response } from 'express';

const whiteList = ['/v1/session/code'];

function GlobalMiddleware(req: Request, res: Response, next: NextFunction) {
  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send('拦截请求');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ type: VersioningType.URI });
  app
    .use(session({ secret: 'test', name: 'test.session' }))
    .use(GlobalMiddleware);

  await app.listen(3002);
}
bootstrap();
