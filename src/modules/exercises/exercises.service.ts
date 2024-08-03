import { Inject, Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm';
import { LevelsService } from '../levels/levels.service';
import { EXERCISES_REPOSITORY } from 'src/constants/repository';

@Injectable()
export class ExercisesService {
  constructor(
    @Inject(EXERCISES_REPOSITORY)
    private readonly exerciseRepository: Repository<Exercise>,
    private readonly levelService: LevelsService,
  ) {}

  /*   create(createExerciseDto: CreateExerciseDto) {
    return 'This action adds a new exercise';
  } */

  async updateExerciseScore(exerciseId: number, score: number): Promise<void> {
    const exercise = await this.exerciseRepository.findOne({
      where: { id: exerciseId },
      relations: ['level'],
    });
    if (!exercise) {
      throw new Error('Exercise not found');
    }

    exercise.score = score;
    await this.exerciseRepository.save(exercise);

    await this.levelService.updateLevelScore(exercise.level.id);
  }

  findAll() {
    return `This action returns all exercises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  /*   update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  } */

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
