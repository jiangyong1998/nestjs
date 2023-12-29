import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { Tags } from './entities/tags.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Tags) private readonly tag: Repository<Tags>,
  ) {}

  async addTags({ tags, userId }: { tags: string[]; userId: number }) {
    const userInfo = await this.user.findOne({ where: { id: userId } });
    userInfo.tags = await Promise.all(
      tags.map(async (item) => {
        const tag = new Tags();
        tag.tags = item;
        await this.tag.save(tag);
        return tag;
      }),
    );
    return this.user.save(userInfo);
  }

  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;
    return this.user.save(data);
  }

  async findAll({ keyWord, page, pageSize }) {
    const data = await this.user.find({
      //查询的时候如果需要联合查询需要增加 relations
      relations: ['tags'],
      where: {
        name: Like(`%${keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const total = await this.user.count({
      where: {
        name: Like(`%${keyWord}%`),
      },
    });
    return { data, total };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
