import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Module({
  imports:[SequelizeModule.forFeature([User])], 
  //  імпорт сущностей що будуть використовуватися у модулі
  // SequelizeModule - за ним ит будемо працювати з БД 
  // forFeature - імпортована логіка використовується лише в рамках даного модулю
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
