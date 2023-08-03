import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JWtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract the JWT token from the Authorization header as a bearer token
      secretOrKey: config.get('JWT_SECRET'), // Get the JWT secret from the ConfigService
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub, // Find the user in the database by ID obtained from the JWT payload
      },
    });

    delete user.hash; // Remove the 'hash' property from the user object to avoid exposing sensitive information
    return user; // Return the user object
  }
}
