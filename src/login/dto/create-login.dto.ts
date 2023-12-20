import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty({ message: '姓名不能为空' })
  @ApiProperty({ description: '姓名', example: '小明' })
  name: string;
  @Length(5, 10, { message: '密码5到10位' })
  @ApiProperty({ description: '密码' })
  password: number;
}
