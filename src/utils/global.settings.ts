import { INestApplication, ValidationPipe, VersioningType } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as compression from "compression";
import helmet from "helmet";

import { Headers } from "../common/constants";
import { GlobalFilter } from "../common/filters";

/**
 * Setup global settings for application
 *
 * @param {NestExpressApplication | INestApplication} app - Nest application instance
 * @param {LoggerService} logger - Logger instance
 */
export function setGlobalSettings(app: NestExpressApplication | INestApplication): void {
  app.enableCors();

  app.use(compression());
  app.use(
    helmet({
      crossOriginEmbedderPolicy: { policy: Headers.CREDENTIALLESS },
      crossOriginResourcePolicy: { policy: Headers.CROSS_ORIGIN },
    }),
  );

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: Headers.VERSION,
  });

  app.useGlobalFilters(new GlobalFilter());
}
