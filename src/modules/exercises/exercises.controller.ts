import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Post(':exerciseId/:studentId')
  updateExerciseScore(
    @Param('exerciseId') exerciseId: number,
    @Param('studentId') studentId: string,
    @Body() { score }: { score: number },
  ) {
    return this.exercisesService.updateExerciseScore(
      studentId,
      exerciseId,
      score,
    );
  }

  @Get()
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(+id);
  }

  @Patch(':exerciseName/:studentId')
  update(
    @Param('exerciseName') exerciseName: string,
    @Param('studentId') studentId: string,
    @Body() updateExerciseDto: { urlFrame: string },
  ) {
    console.log('🚀 ~ ExercisesController ~ studentId:', studentId);
    return this.exercisesService.update(
      exerciseName,
      updateExerciseDto,
      studentId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
