import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {} // Inject the PrismaService into the UserService

  async editUser(userId: number, dto: EditUserDto) {
    // Define a method to edit a user
    const user = await this.prisma.user.update({
      // Use the Prisma client to update the user in the database
      where: {
        id: userId, // Specify the user ID to identify the user to be updated
      },
      data: {
        ...dto, // Spread the properties of the EditUserDto onto the update data to apply the changes
      },
    });

    delete user.hash; // Remove the 'hash' property from the user object to avoid exposing sensitive information

    return user; // Return the updated user
  }
}
