import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBreedDto } from './dto/create-breed.dto';
import { Breed } from './entities/breed.entity';

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createBreedDto: CreateBreedDto) {
    try {
      const breed = this.breedRepository.create(createBreedDto);
      return await this.breedRepository.save(breed);
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        error.code === 'ER_DUP_ENTRY'
      ) {
        throw new ConflictException('Breed already exists');
      }

      throw new InternalServerErrorException('Failed to create breed');
    }
  }

  findAll() {
    return this.breedRepository.find();
  }
}
