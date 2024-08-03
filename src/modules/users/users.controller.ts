import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
/* import { UpdateUserDto } from './dto/update-user.dto'; */
import { RegisterDto } from '../auth/dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: RegisterDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':userId/clan')
  async getClanByUser(@Param('userId') userId: string) {
    try {
      return await this.usersService.getClanByUser(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post(':id')
  findOneBy(@Param('id') param: string, @Body() by: { by: string }) {
    console.log('🚀 ~ UsersController ~ findOneBy ~ by:', by);
    return this.usersService.findBy(param, by);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Put(':userId/:clanId')
  updateClan(@Param('userId') id: string, @Param('clanId') clanId: number) {
    return this.usersService.updateClan(id, clanId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
