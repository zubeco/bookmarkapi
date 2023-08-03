import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  // Create a bookmark for the given user
  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: { userId, ...dto },
    });

    return bookmark;
  }

  // Get all bookmarks for the given user
  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({ where: { userId } });
  }

  // Get a specific bookmark by ID for the given user
  getBookmarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findMany({ where: { id: bookmarkId, userId } });
  }

  // Edit a specific bookmark by ID for the given user
  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    // Get the bookmark by ID
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    // Check if the user owns the bookmark
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    // Update the bookmark with the provided data
    return this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
  }

  // Delete a specific bookmark by ID for the given user
  async deleteBookmarkById(userId: number, bookmarkId: number) {
    // Get the bookmark by ID
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    // Check if the user owns the bookmark
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    // Delete the bookmark
    await this.prisma.bookmark.delete({ where: { id: bookmarkId } });
  }
}
