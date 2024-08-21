import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ClansService } from './clans.service';
import { CreateClanDto, UpdateClanDto } from './dto/clans-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clans')
@Controller('clans')
export class ClansController {
  constructor(private readonly clansService: ClansService) {}

  @Post()
  create(@Body() createClanDto: CreateClanDto) {
    console.log("🚀 ~ ClansController ~ create ~ createClanDto:", createClanDto)
    return this.clansService.create(createClanDto);
  }

  @Get()
  findAll() {
    return this.clansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clansService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateClanDto: UpdateClanDto) {
    return this.clansService.update(id, updateClanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clansService.remove(id);
  }

  @Post(':clanId/members/:userId')
  addMemberToClan(
    @Param('clanId') clanId: number,
    @Param('userId') userId: string,
  ) {
    return this.clansService.addMemberToClan(clanId, userId);
  }
}
