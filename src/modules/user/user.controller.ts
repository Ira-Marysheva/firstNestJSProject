import { Body, Controller, Post} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUSerDTO } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

   @Post('create-user')
   createUsers(@Body() dto:CreateUSerDTO){ // validation inputing data (data transfer) TS  валідація проходить так же як типізація 
    console.log(dto)
    return this.userService.createUser(dto)
   }
}
