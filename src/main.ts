import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { config } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(compression());
  app.use(
    helmet({
      crossOriginEmbedderPolicy: { policy: "credentialless" },
      crossOriginResourcePolicy: { policy: "cross-origin" },
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
    header: "Version",
  });

  await app.listen(config.APP_PORT);
}

bootstrap();
