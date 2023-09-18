import { Injectable } from "@nestjs/common";
import { Buffer } from "node:buffer";
import { parse } from "papaparse";
import { Readable } from "stream";

import { Encodings } from "../../common/constants";

@Injectable()
export class UploadService {
  constructor() {}

  parseCsv(fileBufferInBase64: string): Promise<object[]> {
    const buffer = Buffer.from(fileBufferInBase64, Encodings.BASE64);
    const dataStream = Readable.from(buffer);
    return new Promise((resolve, reject) => {
      parse<object[]>(dataStream, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data, errors }) => {
          if (errors && errors.length) return reject(errors);
          resolve(data);
        },
      });
    });
  }
}
