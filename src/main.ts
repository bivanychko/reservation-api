import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { Headers } from "./common/constants";
import { config } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(config.APP_PORT);
}

bootstrap();
