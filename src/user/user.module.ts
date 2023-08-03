import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController], // Specify the UserController as a controller within this module
  providers: [UserService], // Specify the UserService as a provider within this module
})
export class UserModule {} // Define the UserModule class as a NestJS module
