import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtModuleOptions, JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";
import { genSalt, hash, compare } from 'bcrypt'
import { UserRepository } from "src/user/user.repository";

@Injectable()
export class AuthService {
    constructor(@Inject(JwtService) private jwtService: JwtService, private userRepository: UserRepository) { }

    // Criar autenticação de email para a criação de conta
    // Adicionar recuperação de senha

    async signIn(email: string, passoword: string) {
        const user = await this.userRepository.findOneByEmail(email)

        if (!user) {
            throw new HttpException(`There is no account with this email ${email}`, HttpStatus.BAD_REQUEST)
        }

        await this.verifyPassword(passoword, user.password)

        try {
            const refresh_token = this.jwtService.sign({ id: user.id, email }, {
                expiresIn: '1d',
            })

            return {
                refresh_token
            };
        } catch (err) {
            console.error(err)
            throw new UnauthorizedException()
        }
    }

    async decodeToken(token: string) {
        const decodedToken = await this.jwtService.decode(token);

        if (!decodedToken) {
            throw new UnauthorizedException();
        }

        return { id: decodedToken.id, email: decodedToken.email };
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
            return { access_token, refresh_token }
        } catch (err) {
            console.error(err)
            throw new UnauthorizedException()
        }
    }

    async getRefreshToken(id: string, email: string) {
        try {
            const refresh_token = this.jwtService.sign({ id, email }, {
                expiresIn: '1d',
            })
            return {
                refresh_token
            }
        } catch {
            throw new UnauthorizedException()
        }
    }

    async hashPassword(password: string) {
        const salt = await genSalt()

        return hash(password, salt)
    }

    async verifyPassword(password: string, database_hashed_password: string) {
        if (! await compare(password, database_hashed_password)) {
            throw new UnauthorizedException()
        }
    }
}