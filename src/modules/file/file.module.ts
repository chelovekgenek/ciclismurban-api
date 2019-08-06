import { Module } from "@nestjs/common"

import { FileController } from "./file.controller"
import { FileService, S3Service } from "./services"

@Module({
  imports: [],
  providers: [FileService, S3Service],
  controllers: [FileController],
})
export class FileModule {}
