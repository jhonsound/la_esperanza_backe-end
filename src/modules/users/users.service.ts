import { Inject, Injectable, NotFoundException } from '@nestjs/common';
/* import { UpdateUserDto } from './dto/update-user.dto'; */
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  CLANS_REPOSITORY,
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from 'src/constants/repository';
import { RegisterDto } from '../auth/dto/auth.dto';
import { Role } from '../roles/entities/role.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Clan } from '../clans/entities/clans.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: Repository<Role>,
    @Inject(CLANS_REPOSITORY)
    private readonly clansRepository: Repository<Clan>,
  ) {}

  async getClanByUser(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['clan.members'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    if (!user.clan) {
      throw new NotFoundException(
        `User with ID "${userId}" does not belong to any clan`,
      );
    }

    return user.clan;
  }

  async updateClan(userId: string, clanId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const clan = await this.clansRepository.findOne({ where: { id: clanId } });
    console.log('🚀 ~ UsersService ~ updateClan ~ clan:', clan);
    if (!clan) {
      throw new NotFoundException(`Clan with ID ${clanId} not found`);
    }

    user.clan = clan;
    return await this.userRepository.save(user);
  }

  async create(createUserDto: RegisterDto) {
    try {
      const { rolId, clanId, ...userData } = createUserDto;

      const role = await this.roleRepository.findOneBy({ id: +rolId });
      if (!role) {
        throw new NotFoundException(`Role with ID ${rolId} not found`);
      }

      const clan = await this.clansRepository.findOne({
        where: { id: clanId },
      });
      console.log('🚀 ~ UsersService ~ updateClan ~ clan:', clan);
      if (!clan) {
        throw new NotFoundException(`Clan with ID ${clanId} not found`);
      }
      const user = this.userRepository.create({
        ...userData,
        rol: role,
        clan: clan,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      console.log('🚀 ~ UsersService ~ create ~ error:', error);
      throw new NotFoundException(error);
    }
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['clan', 'rol', 'missions.levels.exercises'],
    });
  }

  async findByEmail(userName: string) {
    return await this.userRepository.findOne({
      where: { userName },
      relations: ['clan.members', 'rol.user', 'missions.levels.exercises'],
    });
  }

  async findBy(param: string, { by }: { by: string }) {
    try {
      return await this.userRepository.findOne({
        where: {
          [by]: param,
        },
        relations: ['clan.members', 'rol.user', 'missions.levels.exercises'],
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    Object.assign(user, updateUserDto);

    if (updateUserDto.rolId) {
      const newRole = await this.roleRepository.findOneBy({
        id: +updateUserDto.rolId,
      });
      if (newRole) {
        user.rol = newRole;
      }
    }

    return await this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
