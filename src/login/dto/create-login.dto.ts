import { IsNotEmpty, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;
  @Length(5, 10, { message: '密码5到10位' })
  password: number;
}
