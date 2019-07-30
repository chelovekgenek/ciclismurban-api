import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { User } from "./entities"
import { UserService } from "./user.service"
import { UserRepositoryProvider } from "./user.repository"
import { UserSubscriber } from "./user.subscriber"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryProvider, UserService, UserSubscriber],
  exports: [UserService, UserRepositoryProvider],
})
export class UserModule {}
