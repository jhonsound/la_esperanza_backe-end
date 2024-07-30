import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateMissionDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  levelIds?: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  userIds?: number[];
}
