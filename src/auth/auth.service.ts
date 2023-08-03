import {
  Injectable,
  HttpException,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {} // Inject the PrismaService, JwtService, and ConfigService into the AuthService

  //SIGNUP LOGIC
  async signup(dto: AuthDto) {
    // Define a method to handle user signup
    try {
      // Generate the password hash using argon2
      const hash = await argon.hash(dto.password);

      // Save the new user in the database using Prisma
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      // Return the signed token for the user
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        // Email uniqueness constraint violation
        throw new HttpException(
          'Email is already registered',
          HttpStatus.CONFLICT,
        );
      }
      throw error; // Rethrow other errors
    }
  }

  //SIGNIN LOGIC
  async signin(dto: AuthDto) {
    // Define a method to handle user signin
    // Find the user in the database by email
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // If user doesn't exist, throw a ForbiddenException
    if (!user) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    // Compare the provided password with the hashed password stored in the database
    const pwMatches = await argon.verify(user.hash, dto.password);

    // If the password doesn't match, throw a ForbiddenException
    if (!pwMatches) {
      throw new ForbiddenException('Credentials Incorrect');
    }

    // Sign and return a token for the user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    // Define a method to sign a token for a user
    const payload = {
      sub: userId, // Set the subject of the token to the user ID
      email, // Include the email in the token payload
    };

    const secret = this.config.get('JWT_SECRET'); // Get the JWT secret from the ConfigService

    // Sign the token using the JwtService with an expiration of 15 minutes
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token, // Return the signed token as an object with the 'access_token' property
    };
  }
}
