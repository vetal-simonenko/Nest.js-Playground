import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { CreateUserDTO } from './dto/create-users.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByID(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserBySearch(name: string): Promise<User[]> {
    if (!name) {
      return await this.userRepository.find();
    }

    return await this.userRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
    });
  }

  async createUser(body: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create({
      name: body.name,
      bio: body.bio,
    });

    return await this.userRepository.save(user);
  }

  async updateUser(id: number, body: UpdateUserDTO): Promise<User> {
    const user = await this.getUserByID(id);

    user.name = body.name || user.name;
    user.bio = body.bio || user.bio;

    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.getUserByID(id);

    await this.userRepository.remove(user);

    return {
      message: 'User deleted successfully',
    };
  }
}
