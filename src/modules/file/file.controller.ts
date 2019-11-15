import { Controller, Post, HttpStatus, UseInterceptors, HttpCode, UploadedFile } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiOperation, ApiUseTags, ApiResponse, ApiImplicitFile } from "@nestjs/swagger"

import { ApiAuthPayload } from "modules/commons"

import { FileService } from "./services/file.service"

@Controller("api/files")
@ApiUseTags("files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: "Upload file" })
  @ApiResponse({ status: HttpStatus.OK, type: String, description: "Link to the file" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: String, description: "Validation error" })
  @ApiImplicitFile({ name: "file", required: true })
  @ApiAuthPayload()
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024, // 5 MB
      },
      fileFilter: FileService.getExtensionFilter([".png", ".jpg", ".jpeg"]),
    }),
  )
  upload(@UploadedFile("file") file: Express.Multer.File): Promise<string> {
    return this.fileService.upload(file)
  }
}
