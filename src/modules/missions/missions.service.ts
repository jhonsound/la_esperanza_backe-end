import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Mission } from './entities/mission.entity';
import { Level } from '../levels/entities/level.entity';
import { User } from '../users/entities/user.entity';
import { CreateMissionDto } from './dto/create-mission.dto';
import { UpdateMissionDto } from './dto/update-mission.dto';
import {
  LEVEL_REPOSITORY,
  MISSION_REPOSITORY,
  USER_REPOSITORY,
} from 'src/constants/repository';

@Injectable()
export class MissionService {
  constructor(
    @Inject(MISSION_REPOSITORY)
    private missionRepository: Repository<Mission>,

    @Inject(LEVEL_REPOSITORY)
    private levelRepository: Repository<Level>,

    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async create(createMissionDto: CreateMissionDto): Promise<Mission> {
    console.log(
      '🚀 ~ MissionService ~ create ~ createMissionDto:',
      createMissionDto,
    );
    const mission = this.missionRepository.create({
      name: createMissionDto.name,
      missionDescription: createMissionDto.description,
    });
    console.log('🚀 ~ MissionService ~ create ~ mission:', mission);
    await this.missionRepository.save(mission);
    return mission;
  }

  async findAll(): Promise<Mission[]> {
    return await this.missionRepository.find({
      relations: ['levels', 'levels.exercises', 'users'],
    });
  }

  async findOne(id: string): Promise<Mission> {
    const mission = await this.missionRepository.findOne({
      where: { id },
      relations: ['levels', 'levels.exercises', 'users'],
    });
    if (!mission) {
      throw new NotFoundException(`Mission with ID ${id} not found`);
    }
    return mission;
  }

  async update(
    id: string,
    updateMissionDto: UpdateMissionDto,
  ): Promise<Mission> {
    await this.findOne(id);
    await this.missionRepository.update(id, updateMissionDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const mission = await this.findOne(id);
    await this.missionRepository.remove(mission);
  }

  async addLevel(missionId: string, levelId: string): Promise<Mission> {
    const mission = await this.findOne(missionId);
    const level = await this.levelRepository.findOne({
      where: { id: levelId },
    });
    if (!level) {
      throw new NotFoundException(`Level with ID ${levelId} not found`);
    }
    mission.levels.push(level);
    return await this.missionRepository.save(mission);
  }

  async removeLevel(missionId: string, levelId: string): Promise<Mission> {
    const mission = await this.findOne(missionId);
    mission.levels = mission.levels.filter((level) => level.id !== levelId);
    return await this.missionRepository.save(mission);
  }

  async addUser(missionId: string, userId: string): Promise<Mission> {
    const mission = await this.findOne(missionId);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    mission.users.push(user);
    return await this.missionRepository.save(mission);
  }

  async removeUser(missionId: string, userId: string): Promise<Mission> {
    const mission = await this.findOne(missionId);
    mission.users = mission.users.filter((user) => user.id !== userId);
    return await this.missionRepository.save(mission);
  }
}
