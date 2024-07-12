import { Inject, Injectable } from '@nestjs/common';
/* import { UpdateUserDto } from './dto/update-user.dto'; */
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ROLE_REPOSITORY, USER_REPOSITORY } from 'src/constants/repository';
import { RegisterDto } from '../auth/dto/auth.dto';
import { Role } from '../roles/entities/role.entity';

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
    console.log('🚀 ~ UsersService ~ create ~ rol:', rol);
    userResponse.rol = rol;
    return await this.clientRepo.save(userResponse);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByEmail(userName: string) {
    return await this.clientRepo.findOneBy({ userName });
  }

  /*  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  } */

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
