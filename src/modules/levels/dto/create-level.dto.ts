import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  name: string;

  @IsUUID()
  missionId: string;

  @IsString()
  title: string;
}

export class UpdateLevelDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUUID()
  @IsOptional()
  missionId?: string;
}

// src/modules/levels/dto/add-exercise.dto.ts

export class AddExerciseDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  urlFrame: string;
}
