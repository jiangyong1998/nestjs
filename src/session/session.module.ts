import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { CommonModule } from 'src/common/common.module';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports: [CommonModule],
  controllers: [SessionController],
  providers: [
    // SessionService,
    { provide: SessionService, useClass: SessionService },
    { provide: 'Session', useExisting: SessionService }, // 别名提供器
    { provide: 'CONFIG', useValue: { baseUrl: './' } },
    {
      provide: 'AsyncSession',
      inject: [SessionService],
      useFactory(sessionService: SessionService) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(sessionService);
          }, 1000);
        });
      },
    },
  ],
})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('v1/session/list');
    // consumer.apply(LoggerMiddleware).forRoutes(SessionController);
    consumer.apply(LoggerMiddleware).forRoutes({
      path: 'session/list',
      method: RequestMethod.GET,
      version: '1',
    });
  }
}
