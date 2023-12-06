import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(params: any): DynamicModule {
    const configProvider = {
      provide: 'Config',
      useValue: {
        baseUrl: './',
        params,
      },
    };
    return {
      module: ConfigModule,
      providers: [configProvider],
      exports: [configProvider],
    };
  }
}
