import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { auth_config } from "./config/auth.config";
import { AuthGuard } from "./guards/auth.guard";
import { UserRepository } from "src/user/user.repository";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { RedirectGuard } from "./guards/redirect.guard";

@Module({
    imports: [JwtModule.register(auth_config), forwardRef(() => UserModule) ],
    exports: [AuthGuard, AuthService],
    providers: [AuthGuard, AuthService, RedirectGuard],
    controllers: [AuthController]
})
export class AuthModule { }