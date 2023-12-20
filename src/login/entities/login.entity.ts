import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Login {
  // 自增列
  @PrimaryGeneratedColumn()
  id: number;
  // 普通列
  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({ type: 'varchar', select: true }) // 定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询
  password: string;

  @Column({ type: 'int', nullable: true, comment: '年龄' })
  age: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_time: Date;

  @Generated('uuid')
  iid: string;

  @Column({ type: 'enum', enum: ['male', 'female'], default: 'male' })
  sex: string;

  // 它可以将原始数组值存储在单个字符串列中。 所有值都以逗号分隔
  @Column('simple-array')
  names: string[];

  // 它可以存储任何可以通过 JSON.stringify 存储在数据库中的值。 当你的数据库中没有 json 类型而你又想存储和加载对象，该类型就很有用了
  @Column('simple-json')
  profile: { name: string; nickname: string };
}
