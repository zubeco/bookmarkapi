import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail() // Validate that the email property is a valid email address
  @IsOptional() // Specify that the email property is optional
  email: string; // Define the email property as a string

  @IsString() // Validate that the firstname property is a string
  @IsOptional() // Specify that the firstname property is optional
  firstName?: string; // Define the firstname property as an optional string

  @IsString() // Validate that the lastname property is a string
  @IsOptional() // Specify that the lastname property is optional
  lastName?: string; // Define the lastname property as an optional string
}
