import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUSerDTO } from '../user/dto';
import { userLoginDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from './response';
import {JwtAuthGuard} from '../../guards/jwt-guard'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    @ApiTags('API')
    @ApiResponse({status:201, type:CreateUSerDTO})
    @Post('register')
    register(@Body() dto:CreateUSerDTO):Promise<CreateUSerDTO>{
        return this.authService.registerUser(dto)
    }

    @ApiTags('API')
    @ApiResponse({status:200, type:AuthUserResponse})
    @Post('login')
    login(@Body() dto:userLoginDTO):Promise<AuthUserResponse>{
        return this.authService.loginUser(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test(){
        return true;
    }
}
