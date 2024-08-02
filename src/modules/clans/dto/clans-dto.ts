// create-clan.dto.ts
export class CreateClanDto {
  id: number;
  average: number;
  status?: string;
  name?: string;
}

// update-clan.dto.ts
import { PartialType } from '@nestjs/mapped-types';

export class UpdateClanDto extends PartialType(CreateClanDto) {}
