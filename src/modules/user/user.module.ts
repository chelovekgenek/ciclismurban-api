import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"

import { Config } from "modules/commons"

import { User } from "./entities"
import { UserRepositoryProvider } from "./user.repository"
import { UserSubscriber } from "./user.subscriber"
import { UserService, AuthService } from "./services"
import { AuthController } from "./controllers"

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: Config.get("JWT_SECRET"),
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [UserRepositoryProvider, UserSubscriber, UserService, AuthService],
  controllers: [AuthController],
})
export class UserModule {}
