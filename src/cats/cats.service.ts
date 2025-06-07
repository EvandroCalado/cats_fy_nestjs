import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { Repository } from 'typeorm';

import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed)
    private breedsRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedsRepository.findOneBy({
      name: createCatDto.breed,
    });

    if (!breed) {
      throw new NotFoundException('Breed not found');
    }

    const cat = this.catRepository.create({
      ...createCatDto,
      breed,
    });
    return this.catRepository.save(cat);
  }

  findAll() {
    return this.catRepository.find();
  }

  async findOne(id: string) {
    const cat = await this.catRepository.findOneBy({ id });

    if (!cat) {
      throw new NotFoundException('Cat not found');
    }

    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    const breed = await this.breedsRepository.findOneBy({
      name: updateCatDto.breed,
    });

    if (!breed) {
      throw new NotFoundException('Breed not found');
    }

    const cat = await this.catRepository.preload({
      id,
      ...updateCatDto,
      breed,
    });

    if (!cat) {
      throw new NotFoundException('Cat not found');
    }

    return this.catRepository.save(cat);
  }

  async remove(id: string) {
    await this.catRepository.findOneBy({ id });

    await this.catRepository.softDelete({ id });

    return {
      message: 'Cat deleted successfully',
    };
  }

  async restore(id: string) {
    await this.catRepository.findOneBy({ id });

    await this.catRepository.restore({ id });

    return {
      message: 'Cat restored successfully',
    };
  }
}
