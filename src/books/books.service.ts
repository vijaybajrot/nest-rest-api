import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private _prisma: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  async findAll() {
    return await this._prisma.book.findMany({ include: { author: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
