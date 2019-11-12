import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { User } from "./entities"
import { UserRepositoryProvider, UserRepository } from "./repositories"
import { UserSubscriber } from "./subscribers"
import { UserService } from "./services"
import { MeUserController } from "./controllers"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [MeUserController],
  providers: [UserRepositoryProvider, UserSubscriber, UserService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
