import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './session/session.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [SessionModule, CommonModule, ConfigModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
