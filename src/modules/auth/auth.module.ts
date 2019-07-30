import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"

import { Config } from "modules/commons"

import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"
import { AuthController } from "./auth.controller"
import { UserModule, UserService } from "modules/user"
import { LoggerModule, LoggerService } from "modules/logger"

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: Config.get("JWT_SECRET"),
      signOptions: {
        expiresIn: 3600,
      },
    }),
    LoggerModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LoggerService, UserService],
  exports: [JwtModule, PassportModule, AuthService],
})
export class AuthModule {}
