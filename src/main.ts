import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { config } from "./config";
import { setGlobalSettings } from "./utils/global.settings";
import { setupSwagger } from "./utils/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setGlobalSettings(app);

  setupSwagger(app);

  await app.listen(config.APP_PORT);
}

bootstrap();
