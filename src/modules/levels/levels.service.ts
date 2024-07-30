import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { Mission } from 'src/modules/missions/entities/mission.entity';
import {
  EXERCISES_REPOSITORY,
  LEVEL_REPOSITORY,
  MISSION_REPOSITORY,
} from 'src/constants/repository';
import {
  AddExerciseDto,
  CreateLevelDto,
  UpdateLevelDto,
} from './dto/create-level.dto';
import { Exercise } from '../exercises/entities/exercise.entity';

@Injectable()
export class LevelsService {
  constructor(
    @Inject(LEVEL_REPOSITORY)
    private levelsRepository: Repository<Level>,
    @Inject(MISSION_REPOSITORY)
    private missionsRepository: Repository<Mission>,
    @Inject(EXERCISES_REPOSITORY)
    private exercisesRepository: Repository<Exercise>,
  ) {}

  async findAll(): Promise<Level[]> {
    try {
      return this.levelsRepository.find({
        relations: ['missions', 'exercises'],
      });
    } catch (error) {
      console.log('🚀 ~ LevelsService ~ findAll ~ error:', error);
      throw new NotFoundException(error);
    }
  }

  async findOne(id: string): Promise<Level> {
    const level = await this.levelsRepository.findOne({
      where: { id },
      relations: ['missions', 'exercises'],
    });
    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }
    return level;
  }

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    const mission = await this.missionsRepository.findOne({
      where: { id: createLevelDto.missionId },
    });
    if (!mission) {
      throw new NotFoundException(
        `Mission with ID ${createLevelDto.missionId} not found`,
      );
    }

    const newLevel = this.levelsRepository.create(createLevelDto);
    newLevel.missions = mission;

    return this.levelsRepository.save(newLevel);
  }

  async update(id: string, updateLevelDto: UpdateLevelDto): Promise<Level> {
    const level = await this.levelsRepository.preload({
      id,
      ...updateLevelDto,
    });
    if (!level) {
      throw new NotFoundException(`Level with ID ${id} not found`);
    }

    if (updateLevelDto.missionId) {
      const mission = await this.missionsRepository.findOne({
        where: { id: updateLevelDto.missionId },
      });
      if (!mission) {
        throw new NotFoundException(
          `Mission with ID ${updateLevelDto.missionId} not found`,
        );
      }
      level.missions = mission;
    }

    return this.levelsRepository.save(level);
  }

  async remove(id: string): Promise<void> {
    const level = await this.findOne(id);
    await this.levelsRepository.remove(level);
  }

  async addExerciseToLevel(
    levelId: string,
    addExerciseDto: AddExerciseDto,
  ): Promise<Exercise> {
    const level = await this.levelsRepository.findOne({
      where: { id: levelId },
      relations: ['exercises'],
    });

    if (!level) {
      throw new NotFoundException(`Level with ID ${levelId} not found`);
    }

    const exercise = this.exercisesRepository.create({
      ...addExerciseDto,
      level,
    });
    return this.exercisesRepository.save(exercise);
  }
}
