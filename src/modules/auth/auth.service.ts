import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUSerDTO } from '../user/dto';
import { AppError } from 'src/common/constants/error';
import { userLoginDTO } from './dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async registerUser(dto:CreateUSerDTO): Promise<CreateUSerDTO>{
        const existUser = await this.userService.findUserByEmail(dto.email)
        if(existUser) throw new BadRequestException(AppError.USER_EXIST)
        return this.userService.createUser(dto)
    }

    async loginUser(dto:userLoginDTO): Promise<userLoginDTO>{
        const existUser = await this.userService.findUserByEmail(dto.email)
        if(!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)

        const validatePassword = await bcrypt.compare(dto.password, existUser.password)
        if(!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)
        return existUser
    }
}
