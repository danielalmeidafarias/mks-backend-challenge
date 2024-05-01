import 'dotenv/config';
import { Injectable, CanActivate, Inject, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { auth_config } from "../config/auth.config";
import { Request } from "express";

@Injectable()

export class RedirectGuard implements CanActivate {
    constructor(@Inject(JwtService) private jwtService: JwtService) { }

    private getHeaders(request: Request) {
        console.log(request.header('uthorization'))
        console.log(request.headers)
        const { referer } = request.headers;
        return { referer };
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const { referer } = this.getHeaders(request);

        if (referer !== `${process.env.SERVER_HOST}/user`) {
            throw new UnauthorizedException();
        }

        return true;
    }
} { }