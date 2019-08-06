import { Injectable, UnprocessableEntityException } from "@nestjs/common"
import path from "path"

import { S3Service } from "./s3.service"
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface"

@Injectable()
export class FileService {
  constructor(private readonly s3Service: S3Service) {}

  static getExtensionFilter(extensions: string[]): MulterOptions["fileFilter"] {
    return (req, file, callback) => {
      const ext = path.extname(file.originalname)
      if (!extensions.includes(ext)) {
        return callback(new UnprocessableEntityException(`Allowed extensions: ${extensions.join(",")}.`), false)
      }
      callback(null, true)
    }
  }

  async upload(file: Express.Multer.File): Promise<string> {
    return (await this.s3Service.upload(file)).Location
  }
}
