import { Inject, Injectable, NotFoundException } from '@nestjs/common';
/* import { UpdateUserDto } from './dto/update-user.dto'; */
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  CLANS_REPOSITORY,
  MISSION_REPOSITORY,
  ROLE_REPOSITORY,
  STUDENT_EXERCISE_REPOSITORY,
  STUDENT_LEVEL_REPOSITORY,
  STUDENT_MISSION_REPOSITORY,
  USER_REPOSITORY,
} from 'src/constants/repository';
import { RegisterDto } from '../auth/dto/auth.dto';
import { Role } from '../roles/entities/role.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Clan } from '../clans/entities/clans.entity';
import { Mission } from '../missions/entities/mission.entity';
import { StudentMission } from './entities/student-mission.entity';
import { StudentLevel } from './entities/student-level.entity';
import { StudentExercise } from './entities/student-exercise.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: Repository<Role>,
    @Inject(CLANS_REPOSITORY)
    private readonly clansRepository: Repository<Clan>,
    @Inject(MISSION_REPOSITORY)
    private readonly missionRepository: Repository<Mission>,
    @Inject(STUDENT_MISSION_REPOSITORY)
    private readonly studentMissionRepository: Repository<StudentMission>,
    @Inject(STUDENT_LEVEL_REPOSITORY)
    private readonly studentLevelRepository: Repository<StudentLevel>,
    @Inject(STUDENT_EXERCISE_REPOSITORY)
    private readonly studentExerciseRepository: Repository<StudentExercise>,
  ) {}

  async getClanByUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['clan.members'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    if (!user.clan) {
      throw new NotFoundException(
        `User with ID "${userId}" does not belong to any clan`,
      );
    }

    return user.clan;
  }

  async updateExerciseScore(
    studentExerciseId: number,
    newScore: number,
  ): Promise<void> {
    const studentExercise = await this.studentExerciseRepository.findOne({
      where: { id: studentExerciseId },
      relations: [
        'studentLevel.studentExercises',
        'studentLevel.studentMission.studentLevels',
        'studentLevel.studentMission.user',
      ],
    });
    if (!studentExercise) {
      throw new NotFoundException(
        `StudentExercise with ID "${studentExerciseId}" not found`,
      );
    }

    studentExercise.score = newScore;
    await this.studentExerciseRepository.save(studentExercise);

    const studentLevel = studentExercise.studentLevel;
    if (!studentLevel) {
      throw new Error(
        `StudentLevel associated with StudentExercise ID "${studentExerciseId}" not found`,
      );
    }

    const totalExerciseScore = studentLevel.studentExercises.reduce(
      (total, exercise) => {
        return total + exercise.score;
      },
      0,
    );
    studentLevel.score = totalExerciseScore;
    await this.studentLevelRepository.save(studentLevel);

    const studentMission = studentLevel.studentMission;
    if (!studentMission) {
      throw new Error(
        `StudentMission associated with StudentLevel ID "${studentLevel.id}" not found`,
      );
    }
    const totalLevelScore = (studentMission.studentLevels || []).reduce(
      (total, level) => total + level.score,
      0,
    );
    studentMission.score = totalLevelScore;
    await this.studentMissionRepository.save(studentMission);

    const user = studentMission.user;
    if (!user) {
      throw new Error(
        `User associated with StudentMission ID "${studentMission.id}" not found`,
      );
    }

    const totalMissionScore = (user.studentMissions || []).reduce(
      (total, mission) => total + mission.score,
      0,
    );
    user.score = totalMissionScore; // Asegúrate de que `totalScore` existe en User
    await this.userRepository.save(user);
  }

  async updateClan(userId: string, clanId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const clan = await this.clansRepository.findOne({ where: { id: clanId } });
    if (!clan) {
      throw new NotFoundException(`Clan with ID ${clanId} not found`);
    }

    user.clan = clan;
    return await this.userRepository.save(user);
  }

  async create(createUserDto: RegisterDto) {
    try {
      const { rolId, clanId, ...userData } = createUserDto;

      const role = await this.roleRepository.findOneBy({ id: +rolId });
      if (!role) {
        throw new NotFoundException(`Role with ID ${rolId} not found`);
      }

      const clan = await this.clansRepository.findOne({
        where: { id: clanId },
      });
      if (!clan) {
        throw new NotFoundException(`Clan with ID ${clanId} not found`);
      }

      const mission = await this.missionRepository.findOne({
        where: { id: '7a32c456-d561-4ef0-8362-2b3d39ad7f86' },
      });
      if (!mission) {
        throw new NotFoundException(
          `Mission with ID '795e2a9d-c4c5-43f6-8b0c-670aa49e833a not found`,
        );
      }
      const user = this.userRepository.create({
        ...userData,
        rol: role,
        clan: clan,
      });
      /* user.studentMissions.push(mission); */

      return await this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  async assignMissionToUser(userId: string, missionId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user)
        throw new NotFoundException(`User with ID "${userId}" not found`);

      const mission = await this.missionRepository.findOne({
        where: { id: missionId },
        relations: ['levels.exercises'],
      });
      if (!mission)
        throw new NotFoundException(`Mission with ID "${missionId}" not found`);

      const studentMission = new StudentMission();
      studentMission.user = user;
      studentMission.mission = mission;
      studentMission.score = 0;
      studentMission.studentLevels = []; // Inicializar como array vacío

      for (const level of mission.levels) {
        const studentLevel = new StudentLevel();
        studentLevel.level = level;
        studentLevel.progress = 0;
        studentLevel.score = 0;
        studentLevel.studentExercises = []; // Inicializar como array vacío
        studentLevel.studentMission = studentMission;

        for (const exercise of level.exercises) {
          const studentExercise = new StudentExercise();
          studentExercise.exercise = exercise;
          studentExercise.score = 0;
          studentLevel.studentExercises.push(studentExercise);
        }
        studentMission.studentLevels.push(studentLevel);
        await this.studentLevelRepository.save(studentLevel);
      }

      await this.studentMissionRepository.save(studentMission);
      return plainToInstance(StudentMission, studentMission, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /* 82abbfad-918e-4307-9ff0-975fe1287f5f */

  async findAllAssignMission() {
    try {
      return await this.studentMissionRepository.find({
        relations: [
          /* 'user',
          'mission', */
          'studentLevels.studentExercises.exercise',
        ],
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findByAssignMission(id: string) {
    try {
      return await this.studentMissionRepository.find({
        where: { id },
        relations: ['user', 'mission', 'studentLevels'],
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: [
          'clan',
          'rol',
          'studentMissions.studentLevels.studentExercises.exercise',
        ],
      });
      users.map((user) => delete user.password);
      return users;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findByEmail(userName: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.userRepository.findOne({
      where: { userName },
      relations: ['clan.members', 'rol.users', 'studentMissions'],
    });
    return user;
  }

  async findBy(param: string, { by }: { by: string }) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const user = await this.userRepository.findOne({
        where: {
          [by]: param,
        },
        relations: [
          'clan.members',
          'rol.users',
          'studentMissions.studentLevels.studentExercises.exercise',
        ],
      });
      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    Object.assign(user, updateUserDto);

    if (updateUserDto.rolId) {
      const newRole = await this.roleRepository.findOneBy({
        id: +updateUserDto.rolId,
      });
      if (newRole) {
        user.rol = newRole;
      }
    }

    return await this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
