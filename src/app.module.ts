import { Module } from "@nestjs/common";

import { ReservationModule } from "./modules/reservation/reservation.module";

@Module({
  imports: [ReservationModule],
})
export class AppModule {}
