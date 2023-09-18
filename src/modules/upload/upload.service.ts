import { Injectable } from "@nestjs/common";
import { Buffer } from "node:buffer";
import { parse } from "papaparse";
import { Readable } from "stream";

@Injectable()
export class UploadService {
  constructor() {}

  parseCsv(fileBufferInBase64: string) {
    const buffer = Buffer.from(fileBufferInBase64, "base64");
    const dataStream = Readable.from(buffer);
    parse(dataStream, {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        console.log(results);
      },
    });
  }
}
