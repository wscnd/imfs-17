import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from './users';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = Users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('wrong user or password');
    }
    const payload = { sub: user.id, username: user.username };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

export type TokenPayload = {
  user: {
    sub: number;
    username: string;
  };
};
