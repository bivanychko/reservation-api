import { Module } from "@nestjs/common";

import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";

/**
 * @ignore
 */
@Module({
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
