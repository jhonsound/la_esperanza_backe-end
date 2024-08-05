import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clan } from './entities/clans.entity';
import { User } from '../users/entities/user.entity';
import { CreateClanDto, UpdateClanDto } from './dto/clans-dto';
import { CLANS_REPOSITORY, USER_REPOSITORY } from 'src/constants/repository';

@Injectable()
export class ClansService {
  constructor(
    @Inject(CLANS_REPOSITORY)
    private clansRepository: Repository<Clan>,
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async create(createClanDto: CreateClanDto): Promise<Clan> {
    console.log('🚀 ~ ClansService ~ create ~ createClanDto:', createClanDto);
    createClanDto.average = +createClanDto.average;
    const clan = this.clansRepository.create(createClanDto);

    return await this.clansRepository.save(clan);
  }

  async findAll(): Promise<Clan[]> {
    return await this.clansRepository.find({ relations: ['members'] });
  }

  async findOne(id: number): Promise<Clan> {
    const clan = await this.clansRepository.findOne({ where: { id } });
    if (!clan) {
      throw new NotFoundException(`Clan with ID ${id} not found`);
    }
    return clan;
  }

  async update(id: number, updateClanDto: UpdateClanDto): Promise<Clan> {
    const clan = await this.findOne(id);
    Object.assign(clan, updateClanDto);
    return await this.clansRepository.save(clan);
  }

  async remove(id: number): Promise<void> {
    const clan = await this.findOne(id);
    await this.clansRepository.remove(clan);
  }

  async addMemberToClan(clanId: number, userId: string): Promise<Clan> {
    const clan = await this.findOne(clanId);
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.clan = clan;
    await this.userRepository.save(user);

    return this.clansRepository.findOne({
      where: { id: clanId },
      relations: ['members'],
    });
  }
}
