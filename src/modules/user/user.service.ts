import { Injectable } from '@nestjs/common';
import { User } from '../user/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUSerDTO, UpdateUserDto } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {} //  додавання готоваої моделі у сервер

  async hashPassword(password:string):Promise<string> {
    try {
      return bcrypt.hash(password, 10);
    } catch (err) {
      throw new Error(err)
    }
  }

  async findUserByEmail(email: string):Promise<User> {
    try {
      return this.userRepository.findOne({ where: { email } });
    } catch (err) {
      throw new Error(err)
    }
  }

  async createUser(dto: CreateUSerDTO): Promise<CreateUSerDTO> {
    try {
      dto.password = await this.hashPassword(dto.password);
    // вирішення проблеми після длдавання типізації параметра і при створенні користувача
    await this.userRepository.create({
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    });
    return dto;
    } catch (err) {
      throw new Error(err)
    }
    
  }

  async publicUser(email: String):Promise<User> {
    try {
        return this.userRepository.findOne({
      where: { email },
      attributes: {
        exclude: ['password'],
      },
      include: {
        model: Watchlist,
        required: false,
      },
    });
    } catch (err) {
      throw new Error(err)
    }
  
  }

  async updateUser(email: string, dto: UpdateUserDto):Promise<UpdateUserDto> {
    try {
      await this.userRepository.update(dto, { where: { email } });
      return dto;
    } catch (err) {
      throw new Error(err)
    }
    
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { email } });
      return true;
    } catch (err) {
      throw new Error(err)
    }
    
  }
}
