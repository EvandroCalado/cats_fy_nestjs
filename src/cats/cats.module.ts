import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, Breed]), ConfigModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
