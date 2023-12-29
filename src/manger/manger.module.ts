import { Module } from '@nestjs/common';
import { MangerService } from './manger.service';
import { MangerController } from './manger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manger } from './entities/manger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manger])],
  controllers: [MangerController],
  providers: [MangerService],
})
export class MangerModule {}
