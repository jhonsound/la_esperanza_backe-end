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
  BadRequestException,
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

  @Get('assignMission')
  findAllAssignMission() {
    return this.usersService.findAllAssignMission();
  }

  @Get('assignMission/:id')
  findByAssignMission(@Param('userId') id: string) {
    return this.usersService.findByAssignMission(id);
  }

  @Get('assignMission/:userId/:missionId')
  assignMission(
    @Param('userId') userId: string,
    @Param('missionId') missionId: string,
  ) {
    return this.usersService.assignMissionToUser(userId, missionId);
  }

  @Put('updateExerciseScore/:studentExerciseId')
  async updateExerciseScore(
    @Param('studentExerciseId') studentExerciseId: number,
    @Body() updateScoreDto: { newScore: number; exerciseId: number },
  ) {
    const { newScore, exerciseId } = updateScoreDto;
    if (newScore < 0) {
      throw new BadRequestException('Score must be a non-negative number');
    }
    try {
      await this.usersService.updateExerciseScore(exerciseId, newScore);
      return { message: 'Exercise score updated successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post(':id')
  findOneBy(@Param('id') param: string, @Body() by: { by: string }) {
    return this.usersService.findBy(param, by);
  }

  @Put(':id')
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
