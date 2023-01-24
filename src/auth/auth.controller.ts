import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';

import { JoiValidationPipe } from '@app/core/validation';
import { loginSchema, registerSchema } from '@app/auth/auth.schemas';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new JoiValidationPipe(loginSchema))
  async login(@Body() { email, password }: LoginDto) {
    const user = await this.authService.validateUser(email, password);

    if (user) {
      return {
        token: 'sadgsja127289173lklk',
      };
    }
  }

  @Post('/register')
  @UsePipes(new JoiValidationPipe(registerSchema))
  async register(@Body() body: RegisterDto) {
    const userExists = await this.authService.findUserByEmail(body.email);

    if (userExists) {
      throw new BadRequestException('User already exists with this email');
    }

    const user = await this.authService.register(body);

    return user;
  }
}
