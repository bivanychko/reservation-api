import { Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors, Version } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { Versions } from "../../common/constants";
import { UploadService } from "./upload.service";

@Controller("/upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("/csv")
  @Version(Versions.V1)
  @UseInterceptors(FileInterceptor("file"))
  uploadCsv(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: "csv" })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.parseCsv(file.buffer.toString("base64"));
  }
}
