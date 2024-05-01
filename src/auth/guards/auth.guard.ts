import 'dotenv/config';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtModuleOptions } from '@nestjs/jwt';
import { auth_config } from '../config/auth.config';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(JwtService) private jwtService: JwtService) { }

  private getRequestTokens(request: Request) {
    const { access_token, refresh_token } = request.body;
    return { access_token, refresh_token };
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { access_token } = this.getRequestTokens(request);

    if (!access_token) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verify(access_token, auth_config)
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
