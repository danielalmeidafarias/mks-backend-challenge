import 'dotenv/config';
import { Injectable, CanActivate, Inject, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { auth_config } from "../config/auth.config";
import { Request } from "express";

@Injectable()

export class RedirectGuard implements CanActivate {
    constructor(@Inject(JwtService) private jwtService: JwtService) { }

    private getHeaders(request: Request) {
        const { referer } = request.headers;
        return { referer };
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const { referer } = this.getHeaders(request);

        if (referer !== `${process.env.SERVER_HOST}/user` && referer !== `${process.env.SERVER_HOST}/auth/sign-in`) {
            throw new UnauthorizedException();
        }

        return true;
    }
} { }