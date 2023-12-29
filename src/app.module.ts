import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from './session/session.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MangerModule } from './manger/manger.module';

@Module({
  imports: [
    SessionModule,
    CommonModule,
    ConfigModule.forRoot({}),
    UploadModule,
    LoginModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'hanweb123',
      host: 'localhost',
      port: 3306,
      database: 'demo',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
      synchronize: true, // synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 重试连接数据库的次数
      autoLoadEntities: true, // 如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    UserModule,
    MangerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
