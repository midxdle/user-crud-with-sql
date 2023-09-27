import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });

    const updatedUser = Object.assign(userToUpdate, updateUserDto);

    return this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
