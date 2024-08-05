// create-clan.dto.ts
export class CreateClanDto {
  average: number;
  status?: string;
  name?: string;
  insigne: string;
}

// update-clan.dto.ts
import { PartialType } from '@nestjs/mapped-types';

export class UpdateClanDto extends PartialType(CreateClanDto) {}
