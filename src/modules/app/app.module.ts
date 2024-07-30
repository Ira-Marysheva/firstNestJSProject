import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import configurationFile from '../../configurations/index'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load:[configurationFile]
  }), 
  SequelizeModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(ConfigService:ConfigService)=>({
      dialect:"postgres",
      host: ConfigService.get('db_host'),
      port: ConfigService.get('db_port'),
      username:ConfigService.get('db_username'),
      password:ConfigService.get('db_password'),
      database:ConfigService.get('db_database'),
      synchronize:true,
      autoLoadModels:false,
      models: []
    })
  }),
  UserModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
