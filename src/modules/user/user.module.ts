import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"

import { User } from "./entities"
import { UserRepositoryProvider } from "./user.repository"
import { UserSubscriber } from "./user.subscriber"
import { UserService, AuthService } from "./services"
import { AuthController } from "./controllers"
import { LocalStrategy, JwtStrategy, GoogleStrategy, FacebookStrategy } from "./strategies"
import { JWT_OPTIONS, PASSPORT_OPTIONS } from "./constants"

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register(PASSPORT_OPTIONS),
    JwtModule.register(JWT_OPTIONS),
  ],
  providers: [
    UserRepositoryProvider,
    UserSubscriber,
    UserService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class UserModule {}
