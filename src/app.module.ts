import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReservationModule } from "./modules/reservation/reservation.module";
import { UploadModule } from "./modules/upload/upload.module";
import { initOrmConfig } from "./orm/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: initOrmConfig,
    }),
    ReservationModule,
    UploadModule,
  ],
})
export class AppModule {}
