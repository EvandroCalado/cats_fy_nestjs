import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { Role, User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        role: Role.USER,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'ER_DUP_ENTRY'
      ) {
        throw new ConflictException('User already exists');
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }

  async findOneByEmailWithPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      select: ['id', 'name', 'email', 'password', 'role'],
    });

    return user;
  }
}
