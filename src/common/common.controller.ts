import { Controller, Get, Inject } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    @Inject('Config') private readonly config: any,
  ) {}

  @Get()
  findConfig() {
    return this.config;
  }
}
