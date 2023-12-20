import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  // SetMetadata,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
// import { LoginPipe } from '../pipe/login.pipe';
import { RoleGuard } from 'src/guard/role.guard';
import { Role } from 'src/decorator/role.decorator';
import { Url } from 'src/decorator/url.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('login')
@UseGuards(RoleGuard)
@ApiTags('login')
@ApiBearerAuth()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  create(@Body(/**LoginPipe*/) createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

  @Get()
  // @SetMetadata('roles', ['admin']) // key, 权限集合
  @Role(['admin'])
  @ApiOperation({ summary: '测试权限', description: '请求该接口需要admin权限' })
  @ApiQuery({ name: 'name', description: '姓名' })
  @ApiResponse({ status: 500, description: '服务器错误' })
  findAll(@Url() url: string) {
    console.log(url);

    return this.loginService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: '用户id', required: true })
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);

    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
