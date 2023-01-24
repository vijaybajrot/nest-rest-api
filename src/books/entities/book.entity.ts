import { User } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

export class Book {
  @Expose({})
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Exclude({ toPlainOnly: true })
  image: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ value }) => {
    return new Date(value).getFullYear();
  })
  updatedAt: Date;

  @Exclude()
  authorId: number;

  @Expose({ name: 'timestamp' })
  get timestamp() {
    return this.createdAt.getTime();
  }

  author: User;

  constructor(partial?: Partial<Book>) {
    Object.assign(this, partial);
  }
}
