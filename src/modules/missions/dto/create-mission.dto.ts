import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateMissionDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  levelIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  userIds?: number[];
}
