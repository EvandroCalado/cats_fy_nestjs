import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { CurrentUser } from 'src/common/interfaces/current-user.interface';
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

  async create(createCatDto: CreateCatDto, user: CurrentUser) {
    const breed = await this.breedsRepository.findOneBy({
      name: createCatDto.breed,
    });

    if (!breed) {
      throw new NotFoundException('Breed not found');
    }

    const cat = this.catRepository.create({
      ...createCatDto,
      breed,
      userEmail: user.email,
    });
    return this.catRepository.save(cat);
  }

  findAll(user: CurrentUser) {
    return this.catRepository.find({
      where: {
        userEmail: user.email,
      },
    });
  }

  async findOne(id: string, user: CurrentUser) {
    const cat = await this.catRepository.findOneBy({ id });

    if (!cat) {
      throw new NotFoundException('Cat not found');
    }

    this.validateOwnerShip(cat, user);

    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto, user: CurrentUser) {
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

    this.validateOwnerShip(cat, user);

    return this.catRepository.save(cat);
  }

  async remove(id: string, user: CurrentUser) {
    const cat = await this.catRepository.findOneBy({ id });

    if (!cat) {
      throw new NotFoundException('Cat not found');
    }

    this.validateOwnerShip(cat, user);

    await this.catRepository.softDelete({ id });

    return {
      message: 'Cat deleted successfully',
    };
  }

  async restore(id: string, user: CurrentUser) {
    const restoredCat = await this.catRepository.restore({ id });

    if (restoredCat.affected === 0) {
      throw new NotFoundException('Cat not found or you are not the owner');
    }

    const cat = await this.catRepository.findOneBy({ id });

    if (!cat) {
      throw new NotFoundException('Cat not found');
    }

    this.validateOwnerShip(cat, user);

    return {
      message: 'Cat restored successfully',
    };
  }

  private validateOwnerShip(cat: Cat, user: CurrentUser) {
    if (cat.userEmail !== user.email) {
      throw new NotFoundException('Cat not found');
    }
  }
}
