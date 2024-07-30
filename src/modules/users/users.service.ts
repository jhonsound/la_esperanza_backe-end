import { Inject, Injectable, NotFoundException } from '@nestjs/common';
/* import { UpdateUserDto } from './dto/update-user.dto'; */
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ROLE_REPOSITORY, USER_REPOSITORY } from 'src/constants/repository';
import { RegisterDto } from '../auth/dto/auth.dto';
import { Role } from '../roles/entities/role.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly clientRepo: Repository<User>,
    @Inject(ROLE_REPOSITORY) private readonly roleRepo: Repository<Role>,
  ) {}

  async create(createUserDto: RegisterDto) {
    const userResponse = this.clientRepo.create(createUserDto);
    const rol = await this.roleRepo.findOneBy({ id: +createUserDto.rolId });
    userResponse.rol = rol;
    userResponse.score = 0;
    return await this.clientRepo.save(userResponse);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(userName: string) {
    return await this.clientRepo.findOneBy({ userName });
  }

  async findBy(param: string, { by }: { by: string }) {
    try {
      console.log('🚀 ~ UsersService ~ findBy ~ by:', by);
      console.log('🚀 ~ UsersService ~ findBy ~ param:', param);
      return await this.clientRepo.findOneBy({ [by]: param });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.clientRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    // Actualizar los campos del usuario
    Object.assign(user, updateUserDto);

    // Si se proporciona un nuevo rolId, actualizar el rol
    if (updateUserDto.rolId) {
      const newRole = await this.roleRepo.findOneBy({
        id: +updateUserDto.rolId,
      });
      if (newRole) {
        user.rol = newRole;
      }
    }

    // Guardar y devolver el usuario actualizado
    return await this.clientRepo.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
