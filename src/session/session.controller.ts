import { Controller, Get, Res, Session, Version } from '@nestjs/common';
import { SessionService } from './session.service';
import { Response } from 'express';
import { SessionData } from 'express-session';
import * as svgCaptcha from 'svg-captcha';

@Controller({ path: 'session', version: '1' })
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('code')
  @Version('1')
  createCode(@Session() session: SessionData, @Res() res: Response) {
    console.log(session);

    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }
}
