import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtModuleOptions, JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";
import { genSalt, hash, compare } from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(@Inject(JwtService) private jwtService: JwtService) { }

    async decodeToken(token: string) {
        const decodedToken = await this.jwtService.decode(token);

        if (!decodedToken) {
            throw new UnauthorizedException();
        }

        return { id: decodedToken.sub, email: decodedToken.email };
    }

    async getAccessToken(refresh_token: string) {
        const { id, email } = await this.decodeToken(refresh_token);
        try {
            const access_token = this.jwtService.sign(
                { id, email },
                {
                    expiresIn: '1h',
                },
            )
            return { access_token }
        } catch {
            throw new UnauthorizedException()
        }
    }

    async getRefreshToken(id: string, email: string) {
        try {
            return {
                refresh_token: this.jwtService.sign({ id, email }, {
                    expiresIn: '1d',
                })
            };
        } catch {
            throw new UnauthorizedException()
        }
    }

    async hashPassword(password: string) {
        const salt = await genSalt()

        return hash(password, salt)
    }

    async verifyPassword(password: string, database_hashed_password: string) {
        if (!compare(password, database_hashed_password)) {
            throw new UnauthorizedException()
        }
    }
}