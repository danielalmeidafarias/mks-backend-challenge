import { Injectable, CanActivate, Inject, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { auth_config } from "../config/auth.config";
import { Request } from "express";

@Injectable()
export class RefreshTokenGuard implements CanActivate {
    constructor(@Inject(JwtService) private jwtService: JwtService) { }

    private getRequestTokens(req: Request) {
        if(!req.query.refresh_token) {
            const refresh_token = req.body.refresh_token;
            return { refresh_token };
        }
        const refresh_token = req.query.refresh_token;
        return { refresh_token };
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const { refresh_token } = this.getRequestTokens(request);

        console.log(refresh_token)

        if (!refresh_token) {
            throw new UnauthorizedException();
        }

        try {
            await this.jwtService.verify(refresh_token, auth_config)
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }
}
