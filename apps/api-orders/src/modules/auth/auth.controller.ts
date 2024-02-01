import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService, TokenPayload } from './auth.service';
import { TUsers } from './users';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  login(@Body() input: TUsers) {
    return this.service.login(input.password, input.username);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() request: Request<TokenPayload>) {
    return request.params.user;
  }
}
