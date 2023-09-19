import { INestApplication } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: NestExpressApplication | INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Swagger")
    .setDescription("The Reservation API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("docs", app, document);
}
