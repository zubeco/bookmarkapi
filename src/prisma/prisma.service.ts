import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    // Inject the ConfigService into the PrismaService
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'), // Get the database URL from the ConfigService
        },
      },
    });
  }

  cleanDb() {
    // Define a method to clean the database
    return this.$transaction([
      // Use Prisma's $transaction method to execute multiple queries in a transaction
      this.bookmark.deleteMany(), // Delete all bookmarks in the database
      this.user.deleteMany(), // Delete all users in the database
    ]);
  }
}
