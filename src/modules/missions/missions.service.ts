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
  STUDENT_MISSION_REPOSITORY,
  USER_REPOSITORY,
} from 'src/constants/repository';
import { StudentMission } from '../users/entities/student-mission.entity';

@Injectable()
export class MissionService {
  constructor(
    @Inject(MISSION_REPOSITORY)
    private missionRepository: Repository<Mission>,

    @Inject(LEVEL_REPOSITORY)
    private levelRepository: Repository<Level>,

    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,

    @Inject(STUDENT_MISSION_REPOSITORY)
    private readonly studentMissionRepository: Repository<StudentMission>,
  ) {}

  async create(createMissionDto: CreateMissionDto): Promise<Mission> {
    const mission = this.missionRepository.create({
      name: createMissionDto.name,
      missionDescription: createMissionDto.description,
    });
    await this.missionRepository.save(mission);
    return mission;
  }

  async findAll(): Promise<Mission[]> {
    try {
      return await this.missionRepository.find({
        relations: ['levels', 'levels.exercises', 'studentMissions'],
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOne(id: string): Promise<Mission> {
    const mission = await this.missionRepository.findOne({
      where: { id },
      relations: ['levels.exercises', 'studentMissions'],
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

  async addLevel(missionId: string, levelId: string) /* : Promise<Mission> */ {
    console.log('🚀 ~ MissionService ~ addLevel ~ levelId:', levelId);
    console.log('🚀 ~ MissionService ~ addLevel ~ missionId:', missionId);
    try {
      const mission = await this.findOne(missionId);
      const level = await this.levelRepository.findOne({
        where: { id: levelId },
      });
      console.log('🚀 ~ MissionService ~ addLevel ~ level:', level);
      if (!level) {
        throw new NotFoundException(`Level with ID ${levelId} not found`);
      }
      mission.levels.push(level);
      return await this.missionRepository.save(mission);
    } catch (error) {
      console.log('🚀 ~ MissionService ~ addLevel ~ error:', error);
      throw new Error(error);
    }
  }

  async assignUserToMission(missionId: string, userId: string): Promise<void> {
    try {
      // Buscar la misión
      const mission = await this.missionRepository.findOne({
        where: { id: missionId },
      });
      if (!mission) {
        throw new NotFoundException(`Mission with ID ${missionId} not found`);
      }

      // Buscar el usuario
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // Verificar si ya existe una asignación de misión para el usuario
      const existingStudentMission =
        await this.studentMissionRepository.findOne({
          where: { mission: { id: missionId }, user: { id: userId } },
        });
      if (existingStudentMission) {
        throw new Error(
          `User with ID ${userId} is already assigned to mission ${missionId}`,
        );
      }

      // Crear una nueva instancia de StudentMission
      const newStudentMission = this.studentMissionRepository.create({
        mission,
        user,
        score: 0,
      });

      // Guardar la nueva asignación
      await this.studentMissionRepository.save(newStudentMission);
    } catch (error) {
      console.error('Error in assignUserToMission:', error);
      throw new Error(
        'An error occurred while assigning the user to the mission',
      );
    }
  }

  async removeLevel(missionId: string, levelId: string): Promise<Mission> {
    const mission = await this.findOne(missionId);
    mission.levels = mission.levels.filter((level) => level.id !== levelId);
    return await this.missionRepository.save(mission);
  }

  async removeUser(missionId: string, userId: string): Promise<Mission> {
    const mission = await this.findOne(missionId);
    mission.studentMissions = mission.studentMissions.filter(
      (user) => user.id !== userId,
    );
    return await this.missionRepository.save(mission);
  }

  async updateMissionScore(missionId: string): Promise<void> {
    const mission = await this.missionRepository.findOne({
      where: { id: missionId },
      relations: ['levels', 'users'],
    });
    if (!mission) {
      throw new Error('Mission not found');
    }

    mission.score = mission.levels.reduce(
      (total, level) => total + level.score,
      0,
    );
    await this.missionRepository.save(mission);

    for (const user of mission.studentMissions) {
      user.score += mission.score;
      await this.userRepository.save(user);
    }
  }
}
