import { Body, Controller, Get, Post, Query, Res, UseGuards } from "@nestjs/common";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RedirectGuard } from "./guards/redirect.guard";
import { AuthService } from "./auth.service";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";
import { Response } from "express";
import { SignInDTO } from "./dto/sign-in.dto";
import { ApiExcludeController, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/sign-in')
    async signIn(@Body() { email, password }: SignInDTO, @Res() res: Response) {
        const { refresh_token } = await this.authService.signIn(email, password)
        res.status(302).redirect(`/auth/get-token/?refresh_token=${refresh_token}`)
    }

    @UseGuards(RedirectGuard)
    @UseGuards(RefreshTokenGuard)
    @ApiExcludeEndpoint()
    @Get('/get-token')
    async signin(@Query('refresh_token') refresh_token: string) {
        return await this.authService.getAccessToken(refresh_token)
    }

    @UseGuards(RefreshTokenGuard)
    @Post('/refresh')
    async refreshToken(@Body() { refresh_token }: RefreshTokenDto) {
        return await this.authService.getAccessToken(refresh_token)
    }
}