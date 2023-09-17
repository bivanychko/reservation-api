import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReservationController } from "./reservation.controller";
import { ReservationService } from "./reservation.service";
import { Amenity } from "./entities/amenity.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Amenity]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
