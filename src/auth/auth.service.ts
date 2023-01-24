import { PrismaService } from '@app/database';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private _prisma: PrismaService) {}

  async register(data: RegisterDto) {
    try {
      return await this._prisma.user.create({ data });
    } catch (e: any) {
      console.log('e :>> ', e);
      throw new BadRequestException('Unable to create the user');
    }
  }

  async findUserByEmail(email: string) {
    return await this._prisma.user.findFirst({ where: { email } });
  }

  async validateUser(email: string, password: string) {
    const user = await this._prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.password != password) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
