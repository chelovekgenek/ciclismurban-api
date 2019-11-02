import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"

import { UserModule, UserService } from "modules/user"

import { AuthService } from "./services"
import { AuthController } from "./controllers"
import { LocalStrategy, JwtStrategy, GoogleStrategy, FacebookStrategy } from "./strategies"
import { JWT_OPTIONS, PASSPORT_OPTIONS } from "./constants"

@Module({
  imports: [PassportModule.register(PASSPORT_OPTIONS), JwtModule.register(JWT_OPTIONS), UserModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, FacebookStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
