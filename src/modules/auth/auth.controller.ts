import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUSerDTO } from '../user/dto';
import { userLoginDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('register')
    register(@Body() dto:CreateUSerDTO):Promise<CreateUSerDTO>{
        return this.authService.registerUser(dto)
    }

    @Post('login')
    login(@Body() dto:userLoginDTO):Promise<userLoginDTO>{
        return this.authService.loginUser(dto)
    }
}
