import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private userRepo: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({ where: { user_email: createUserDto.user_email , deleted: false  } });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const user = this.userRepo.create({...createUserDto, createdBy: { user_id: createUserDto.created_by} as User
    });
    return this.userRepo.save(user);
  }

  findAll() {
    const allUsers = this.userRepo.find({ where: { deleted: false } });
    return allUsers;
  }

  async findAllUsers() {
    const users = await this.userRepo.find({ where: { user_role: 'user', deleted: false } });
    return users;
  }
  
  async findAllAdmins() {
    const admins = await this.userRepo.find({ where: { user_role: 'admin', deleted: false } });
    return admins;
  }


  async findLoginUser(condition: any): Promise<User> {
    return await this.userRepo.findOne(condition);
  }

  findUserById(id: number): Promise<User> {
    const user = this.userRepo.findOne({ where: { user_id: id } });
    return user;
  }

  updateUserById(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  deleteUserById(id: number) {
    return this.userRepo.delete(id);
  }

  async markUserAsDeletedById(id: number): Promise<any> {
    return this.userRepo.update(id, { deleted: true });
  }

  async searchUser(alias: string) {
    return this.userRepo.createQueryBuilder(alias);
  }

  async updatePassword(id: number, currentPassword: string, newPassword: string) {
    const user = await this.userRepo.findOne({ where: { user_id: id } });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const isMatch = await bcrypt.compare(currentPassword, user.password);
  
    if (!isMatch) {
      throw new UnauthorizedException('Current password is incorrect');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUser = await this.userRepo.update(id, { password: hashedPassword });
  
    if (!updatedUser.affected) {
      throw new NotFoundException('User not found');
    }
  
    return updatedUser;
  }

  adminCount() {
    return this.userRepo.count({ where: { user_role: 'admin' } });
  }

}
