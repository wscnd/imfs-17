import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request<TokenPayload> = context.switchToHttp().getRequest();
    try {
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new Error('Please login');
      }

      const payload = this.jwtService.decode(token);

      if (!payload) {
        throw new Error('Please login');
      }

      request.params.user = payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }

  private extractTokenFromHeader(
    request: Request<TokenPayload>,
  ): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
