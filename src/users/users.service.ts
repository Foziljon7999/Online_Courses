import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositroy: Repository<User>,
  ) {}
  async createAdmin(username: string, email: string, password: string, role: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = this.userRepositroy.create({
      username,
      email,
      password: hashedPassword,
      role
    })
    await this.userRepositroy.save(user)
    return user
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
