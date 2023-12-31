import { Controller, Get, Inject, Res, Session, Version } from '@nestjs/common';
import { SessionService } from './session.service';
import { Response } from 'express';
import { SessionData } from 'express-session';
import * as svgCaptcha from 'svg-captcha';
import { CommonService } from 'src/common/common.service';

@Controller({ path: 'session', version: '1' })
export class SessionController {
  constructor(
    private readonly common: CommonService,
    private readonly sessionService: SessionService,
    @Inject('Session') private readonly session: SessionService,
    @Inject('CONFIG') private readonly config: { [key: string]: any },
    @Inject('AsyncSession') private readonly asyncSession: SessionService,
  ) {}

  @Get('list')
  findList() {
    // return this.session.fetchData();
    // return this.config;
    // return this.asyncSession.fetchData();
    return this.common.commonMethod();
  }

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
