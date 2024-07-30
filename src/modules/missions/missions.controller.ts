import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import { MissionService } from './missions.service';

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post()
  create(@Body() createMissionDto: CreateMissionDto) {
    console.log(
      '🚀 ~ MissionController ~ create ~ createMissionDto:',
      createMissionDto,
    );
    return this.missionService.create(createMissionDto);
  }

  @Get()
  findAll() {
    return this.missionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.missionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateMissionDto: UpdateMissionDto,
  ) {
    return this.missionService.update(id, updateMissionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.missionService.remove(id);
  }

  @Post(':id/levels/:levelId')
  addLevel(
    @Param('id', ParseIntPipe) id: string,
    @Param('levelId', ParseIntPipe) levelId: string,
  ) {
    return this.missionService.addLevel(id, levelId);
  }

  @Delete(':id/levels/:levelId')
  removeLevel(
    @Param('id', ParseIntPipe) id: string,
    @Param('levelId', ParseIntPipe) levelId: string,
  ) {
    return this.missionService.removeLevel(id, levelId);
  }

  @Post(':id/users/:userId')
  addUser(
    @Param('id', ParseIntPipe) id: string,
    @Param('userId', ParseIntPipe) userId: string,
  ) {
    return this.missionService.addUser(id, userId);
  }

  @Delete(':id/users/:userId')
  removeUser(
    @Param('id', ParseIntPipe) id: string,
    @Param('userId', ParseIntPipe) userId: string,
  ) {
    return this.missionService.removeUser(id, userId);
  }
}
