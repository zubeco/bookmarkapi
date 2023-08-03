import { Module } from '@nestjs/common'; // Importing the Module class from the NestJS framework
import { ConfigModule } from '@nestjs/config'; // Importing the ConfigModule from the NestJS Config package
import { AuthModule } from './auth/auth.module'; // Importing the AuthModule from the local 'auth' module
import { UserModule } from './user/user.module'; // Importing the UserModule from the local 'user' module
import { BookmarkModule } from './bookmark/bookmark.module'; // Importing the BookmarkModule from the local 'bookmark' module
import { PrismaModule } from './prisma/prisma.module'; // Importing the PrismaModule from the local 'prisma' module

@Module({
  // Decorator to define a module in NestJS
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Configuring the ConfigModule to load environment variables globally
    AuthModule, // Including the AuthModule in the imports array
    UserModule, // Including the UserModule in the imports array
    BookmarkModule, // Including the BookmarkModule in the imports array
    PrismaModule, // Including the PrismaModule in the imports array
  ],
})
export class AppModule {} // Exporting the AppModule class
