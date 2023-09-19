import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { config } from "./config";
import { setGlobalSettings } from "./utils/global.settings";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setGlobalSettings(app);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Swagger")
    .setDescription("The Reservation API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("docs", app, document);

  await app.listen(config.APP_PORT);
}

bootstrap();
