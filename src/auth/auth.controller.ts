import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RedirectGuard } from "./guards/redirect.guard";
import { AuthService } from "./auth.service";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(RedirectGuard)
    @UseGuards(RefreshTokenGuard)
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