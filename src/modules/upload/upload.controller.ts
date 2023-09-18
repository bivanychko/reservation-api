import { Controller, FileTypeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors, Version } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBadRequestResponse, ApiConsumes, ApiHeader, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { Encodings, Headers, Versions } from "../../common/constants";
import { UploadService } from "./upload.service";

@Controller("/upload")
@ApiHeader({
  name: Headers.VERSION,
  description: "Version of data to retrieve",
  required: true,
  schema: {
    enum: [Versions.V1],
  },
})
@ApiTags("Upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("/csv")
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: Object })
  @ApiConsumes("multipart/form-data")
  @Version(Versions.V1)
  @UseInterceptors(FileInterceptor("file"))
  uploadCsv(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: "csv" })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<object[]> {
    return this.uploadService.parseCsv(file.buffer.toString(Encodings.BASE64));
  }
}
