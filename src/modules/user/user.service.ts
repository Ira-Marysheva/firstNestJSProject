import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../user/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt'
import { CreateUSerDTO } from './dto';
import { AppError } from 'src/common/constants/error';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User){} //  додавання готоваої моделі у сервер

  async hashPassword(password){
    return bcrypt.hash(password, 10)
  }
  
  async findUserByEmail(email:string){
    return this.userRepository.findOne({where:{email}})
  }

  async createUser(dto: CreateUSerDTO): Promise<CreateUSerDTO> {
    const existUser = await this.findUserByEmail(dto.email)
    if(existUser) throw new BadRequestException(AppError.USER_EXIST)

    dto.password = await this.hashPassword(dto.password)
    // вирішення проблеми після длдавання типізації параметра і при створенні користувача
    await this.userRepository.create(
      {
        firstName: dto.firstName,
        userName: dto.userName,
        email: dto.email,
        password: dto.password
      }
    )
    return dto

  }
}
