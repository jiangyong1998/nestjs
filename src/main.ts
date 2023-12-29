import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { NextFunction, Request, Response } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import { ResponseFilter } from './filter/response.filter';
import { RoleGuard } from './guard/role.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const blackList = ['/v1/session/code'];

function GlobalMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!blackList.includes(req.originalUrl)) {
    next();
  } else {
    res.send('拦截请求');
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableVersioning({ type: VersioningType.URI });
  app
    .use(session({ secret: 'test', name: 'test.session' }))
    .use(GlobalMiddleware);
  app.useStaticAssets(join(__dirname, 'files'), { prefix: '/files' });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ResponseFilter());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new RoleGuard(new Reflector()));

  // swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('接口文档')
    .setDescription('接口文档描述')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(3002);
}
bootstrap();
