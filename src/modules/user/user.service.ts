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

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateUSerDTO): Promise<CreateUSerDTO> {
    dto.password = await this.hashPassword(dto.password);
    // вирішення проблеми після длдавання типізації параметра і при створенні користувача
    await this.userRepository.create({
      firstName: dto.firstName,
      userName: dto.userName,
      email: dto.email,
      password: dto.password,
    });
    return dto;
  }

  async publicUser(email: String) {
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
  }

  async updateUser(email: string, dto: UpdateUserDto) {
    await this.userRepository.update(dto, { where: { email } });
    return dto;
  }
  requestAnimationFrame;

  async deleteUser(email: string): Promise<boolean> {
    await this.userRepository.destroy({ where: { email } });
    return true;
  }
}
