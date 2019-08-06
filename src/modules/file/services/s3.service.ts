import { Injectable } from "@nestjs/common"
import AWS from "aws-sdk"
import { CompleteMultipartUploadOutput } from "aws-sdk/clients/s3"
import uuid from "uuid/v4"

import { Config } from "modules/commons"

AWS.config.update({
  region: Config.get("AWS_REGION"),
  apiVersion: Config.get("AWS_API_VERSION"),
  accessKeyId: Config.get("AWS_ACCESS_KEY_ID"),
  secretAccessKey: Config.get("AWS_SECRET_ACCESS_KEY_ID"),
})

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3
  private readonly bucket = {
    name: Config.get("AWS_S3_BUCKET"),
    folder: Config.get("AWS_S3_BUCKET_FOLDER"),
  }

  constructor() {
    this.s3 = new AWS.S3()
  }

  async upload(file: Express.Multer.File): Promise<CompleteMultipartUploadOutput> {
    file.originalname = file.originalname.replace(/^.*\./i, `${uuid()}.`)
    return this.s3
      .upload({
        Key: `${this.bucket.folder}/${file.originalname}`,
        Body: file.buffer,
        Bucket: this.bucket.name,
        ACL: "public-read",
      })
      .promise()
  }
}
