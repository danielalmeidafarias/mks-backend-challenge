import 'dotenv/config';
import { JwtModuleOptions } from "@nestjs/jwt";

export const auth_config: JwtModuleOptions = {
    secret: process.env.JWT_SECRET_KEY,
}