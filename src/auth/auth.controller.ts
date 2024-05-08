import { Body, Controller, Get, Post, Query, Res, UseGuards } from "@nestjs/common";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RedirectGuard } from "./guards/redirect.guard";
import { AuthService } from "./auth.service";
import { RefreshTokenGuard } from "./guards/refresh-token.guard";
import { Response } from "express";
import { SignInDTO } from "./dto/sign-in.dto";
import { ApiExcludeController, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/sign-in')
    @ApiUnauthorizedResponse({
        description: 'invalid password', schema: {
            example: {
                "message": "Unauthorized",
                "statusCode": 401
            }
        }
    })
    @ApiResponse({
        status: 200, schema: {
            example: {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiMjBlMWMxLThiZTQtNDBiZS1iNzMzLTZiYzJiYzUyNWZiYyIsImVtYWlsIjoiZGFuaWVsYWxtZWlkYWZhcmlhcy5kZXZAZ21haWwuY29tIiwiaWF0IjoxNzE1MjA0Mjk5LCJleHAiOjE3MTUyMDc4OTl9.5IlgopaROm6SGv2QPI7DHXCQRbZd17_amTYoUoYquVw",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiMjBlMWMxLThiZTQtNDBiZS1iNzMzLTZiYzJiYzUyNWZiYyIsImVtYWlsIjoiZGFuaWVsYWxtZWlkYWZhcmlhcy5kZXZAZ21haWwuY29tIiwiaWF0IjoxNzE1MjA0MTk4LCJleHAiOjE3MTUyOTA1OTh9.0MQ6Mhtl3ALJBgqizOT0RGtdix8O1uSp88AxyPNWe8E"
            }
        }
    })
    @ApiOperation({ summary: 'signing in your account' })
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

    
    @ApiResponse({
        status: 200, schema: {
            example: {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiMjBlMWMxLThiZTQtNDBiZS1iNzMzLTZiYzJiYzUyNWZiYyIsImVtYWlsIjoiZGFuaWVsYWxtZWlkYWZhcmlhcy5kZXZAZ21haWwuY29tIiwiaWF0IjoxNzE1MjA0Mjk5LCJleHAiOjE3MTUyMDc4OTl9.5IlgopaROm6SGv2QPI7DHXCQRbZd17_amTYoUoYquVw",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhiMjBlMWMxLThiZTQtNDBiZS1iNzMzLTZiYzJiYzUyNWZiYyIsImVtYWlsIjoiZGFuaWVsYWxtZWlkYWZhcmlhcy5kZXZAZ21haWwuY29tIiwiaWF0IjoxNzE1MjA0MTk4LCJleHAiOjE3MTUyOTA1OTh9.0MQ6Mhtl3ALJBgqizOT0RGtdix8O1uSp88AxyPNWe8E"
            }
        }
    })
    @UseGuards(RefreshTokenGuard)
    @ApiOperation({ summary: 'getting new tokens with refresh_token' })
    @ApiUnauthorizedResponse({
        description: 'invalid or expired refresh_token', schema: {
            example: {
                "message": "Unauthorized",
                "statusCode": 401
            }
        }
    })
    @Post('/refresh')
    async refreshToken(@Body() { refresh_token }: RefreshTokenDto) {
        return await this.authService.getAccessToken(refresh_token)
    }
}