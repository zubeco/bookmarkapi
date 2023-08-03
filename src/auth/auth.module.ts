import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})], // Import the JwtModule and register it with default options
  controllers: [AuthController], // Specify the AuthController as a controller within this module
  providers: [AuthService, JWtStrategy], // Specify the AuthService and JWtStrategy as providers within this module
})
export class AuthModule {} // Define the AuthModule class as a NestJS module
