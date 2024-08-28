import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUSerDTO } from '../user/dto';
import { AppError } from 'src/common/constants/error';
import { userLoginDTO } from './dto';
import * as bcrypt from 'bcrypt'
import { TokenService } from 'src/token/token.service';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, 
        private readonly tokenService: TokenService
    ){}

    async registerUser(dto:CreateUSerDTO): Promise<CreateUSerDTO>{
        try{
            const existUser = await this.userService.findUserByEmail(dto.email)
            if(existUser) throw new BadRequestException(AppError.USER_EXIST)
            return this.userService.createUser(dto)
        }catch(err){
            throw new Error(err)
        }
        
    }

    async loginUser(dto:userLoginDTO): Promise<AuthUserResponse>{
        try {
            const existUser = await this.userService.findUserByEmail(dto.email)
            if(!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)

            const validatePassword = await bcrypt.compare(dto.password, existUser.password)
            if(!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)
        
            const user = await this.userService.publicUser(dto.email)

            const token = await this.tokenService.generateJwtToken(user)
            return {user, token}
        } catch (err) {
            throw new Error(err)
        }

        
    }
}
