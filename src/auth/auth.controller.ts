import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth') // Set the base route for this controller to '/auth'
export class AuthController {
  constructor(private authService: AuthService) {} // Inject the AuthService into the controller

  @Post('signup') // Handle POST requests to '/auth/signup' route
  signup(@Body() dto: AuthDto) { // Get the request body from @Body decorator
    return this.authService.signup(dto); // Call the AuthService to handle user signup
  }

  @HttpCode(200) // Set the HTTP response code to 200 for this route
  @Post('signin') // Handle POST requests to '/auth/signin' route
  signin(@Body() dto: AuthDto) { // Get the request body from @Body decorator
    return this.authService.signin(dto); // Call the AuthService to handle user signin
  }
}
