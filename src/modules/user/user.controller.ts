import {Body, Controller, Delete, Patch, Req, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtStrategy } from 'src/strategy';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('API')
  @ApiResponse({status:200, type:UpdateUserDto})
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto:UpdateUserDto, @Req() request):Promise<UpdateUserDto>{
    const user = request.user
    return this.userService.updateUser(user. email, updateDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@Req() request){
    const user = request.user
    return this.userService.deleteUser(user.email)

  }

  //  @Post('create-user')
  //  createUsers(@Body() dto:CreateUSerDTO){ // validation inputing data (data transfer) TS  валідація проходить так же як типізація 
  //   console.log(dto)
  //   return this.userService.createUser(dto)
  //  }
}
