import { Controller, Get, Version } from "@nestjs/common";

import { ReservationService } from "./reservation.service";

@Controller("/reservations")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @Version("1.0")
  listReservations(): string[] {
    return this.reservationService.getListReservations();
  }
}
