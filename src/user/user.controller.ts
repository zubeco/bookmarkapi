import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard) // Apply JwtGuard to protect the routes in this controller
@Controller('users') // Set the base route for this controller to '/users'
export class UserController {
  constructor(private userService: UserService) {} // Inject the UserService into the controller

  @Get('me') // Handle GET requests to '/users/me' route
  getMe(@GetUser() user: User) {
    // Get the authenticated user from the GetUser decorator
    return user; // Return the authenticated user
  }

  @Patch() // Handle PATCH requests to '/users' route
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    // Get the user ID from the GetUser decorator and the request body from @Body decorator
    return this.userService.editUser(userId, dto); // Call the UserService to edit the user with the provided ID and DTO
  }
}


