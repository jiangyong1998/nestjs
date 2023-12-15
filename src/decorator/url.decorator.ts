import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Url = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.url;
  },
);
