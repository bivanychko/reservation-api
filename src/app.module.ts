import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReservationModule } from "./modules/reservation/reservation.module";
import { initOrmConfig } from "./orm/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: initOrmConfig,
    }),
    ReservationModule,
  ],
})
export class AppModule {}
