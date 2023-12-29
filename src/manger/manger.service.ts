import { Injectable } from '@nestjs/common';
import { CreateMangerDto, TransferMoneyDto } from './dto/create-manger.dto';
import { UpdateMangerDto } from './dto/update-manger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manger } from './entities/manger.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MangerService {
  constructor(
    @InjectRepository(Manger) private readonly money: Repository<Manger>,
  ) {}

  create(createMangerDto: CreateMangerDto) {
    return this.money.save(createMangerDto);
  }

  async transferMoney({ fromId, toId, money }: TransferMoneyDto) {
    try {
      return await this.money.manager.transaction(async (manager) => {
        const from = await this.money.findOne({ where: { id: fromId } });
        const to = await this.money.findOne({ where: { id: toId } });
        if (from.money >= money) {
          manager.save(Manger, { id: fromId, money: from.money - money });
          manager.save(Manger, { id: toId, money: to.money + money });
          return {
            message: '转账成功',
          };
        } else {
          return {
            message: '余额不足',
          };
        }
      });
    } catch (error) {
      return { message: error };
    }
  }

  findAll() {
    return `This action returns all manger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manger`;
  }

  update(id: number, updateMangerDto: UpdateMangerDto) {
    return `This action updates a #${id} manger`;
  }

  remove(id: number) {
    return `This action removes a #${id} manger`;
  }
}
