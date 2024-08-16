import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm';
import { LevelsService } from '../levels/levels.service';
import {
  EXERCISES_REPOSITORY,
  STUDENT_EXERCISE_REPOSITORY,
  STUDENT_LEVEL_REPOSITORY,
  STUDENT_MISSION_REPOSITORY,
} from 'src/constants/repository';
import { StudentExercise } from '../users/entities/student-exercise.entity';
import { StudentLevel } from '../users/entities/student-level.entity';
import { StudentMission } from '../users/entities/student-mission.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @Inject(EXERCISES_REPOSITORY)
    private readonly exerciseRepository: Repository<Exercise>,
    @Inject(STUDENT_EXERCISE_REPOSITORY)
    private readonly studentExercisesRepository: Repository<StudentExercise>,

    @Inject(STUDENT_LEVEL_REPOSITORY)
    private readonly studentLevelsRepository: Repository<StudentLevel>,

    @Inject(STUDENT_MISSION_REPOSITORY)
    private readonly studentMissionsRepository: Repository<StudentMission>,
    private readonly levelService: LevelsService,
  ) {}

  create(createExerciseDto: CreateExerciseDto) {
    return 'This action adds a new exercise';
  }

  async updateExerciseScore(
    studentId: string,
    exerciseId: number,
    score: number,
  ): Promise<void> {
    const studentExercise = await this.studentExercisesRepository.findOne({
      where: {
        studentLevel: { studentMission: { user: { id: studentId } } },
        exercise: { id: exerciseId },
      },
      relations: [
        'studentLevel',
        'exercise',
        'studentLevel.studentMission',
        'studentLevel.studentMission.user',
      ],
    });

    if (!studentExercise) {
      throw new NotFoundException(
        `StudentExercise not found for studentId ${studentId} and exerciseId ${exerciseId}`,
      );
    }

    studentExercise.score = score;
    await this.studentExercisesRepository.save(studentExercise);

    const studentLevel = studentExercise.studentLevel;
    studentLevel.score = await this.calculateTotalScoreForStudentLevel(
      studentLevel.id,
    );
    await this.studentLevelsRepository.save(studentLevel);

    const studentMission = studentLevel.studentMission;
    studentMission.score = await this.calculateTotalScoreForStudentMission(
      studentMission.id,
    );
    await this.studentMissionsRepository.save(studentMission);
  }

  private async calculateTotalScoreForStudentLevel(
    studentLevelId: number,
  ): Promise<number> {
    const studentLevel = await this.studentLevelsRepository.findOne({
      where: { id: studentLevelId },
      relations: ['studentExercises'],
    });
    return studentLevel.studentExercises.reduce(
      (total, exercise) => total + exercise.score,
      0,
    );
  }

  private async calculateTotalScoreForStudentMission(
    studentMissionId: string,
  ): Promise<number> {
    const studentMission = await this.studentMissionsRepository.findOne({
      where: { id: studentMissionId },
      relations: ['studentLevels'],
    });
    return studentMission.studentLevels.reduce(
      (total, level) => total + level.score,
      0,
    );
  }

  findAll() {
    return `This action returns all exercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    const exercise = await this.exerciseRepository.findOne({ where: { id } });
    if (!exercise) {
      throw new NotFoundException(`exercise with ID "${id}" not found`);
    }

    Object.assign(exercise, updateExerciseDto);

    return await this.exerciseRepository.save(exercise);
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
