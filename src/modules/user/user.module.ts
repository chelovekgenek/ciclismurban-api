import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { User } from "./entities"
import { UserRepositoryProvider, UserRepository } from "./repositories"
import { UserSubscriber } from "./subscribers"
import { UserService } from "./services"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryProvider, UserSubscriber, UserService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
