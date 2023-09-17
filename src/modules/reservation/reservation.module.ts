import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Amenity, Reservation } from "./entities";
import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";

@Module({
  imports: [TypeOrmModule.forFeature([Amenity, Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
