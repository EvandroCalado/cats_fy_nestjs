import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';

import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entities/user.entity';
import { UsersService } from './users.service';

@Auth(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOneByEmail(@Body() email: string) {
    return this.usersService.findOneByEmail(email);
  }
}
