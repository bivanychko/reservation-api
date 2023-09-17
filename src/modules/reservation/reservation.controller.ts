import { Controller, Get, Query, Version } from "@nestjs/common";

import { PaginationResponseDto } from "../../common/dto/pagination.response.dto";
import { ListReservationsQuery } from "./dto/list-reservations.query.dto";
import { ReservationService } from "./reservation.service";

@Controller("/reservations")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @Version("1.0")
  listReservations(@Query() query: ListReservationsQuery): Promise<PaginationResponseDto<object>> {
    return this.reservationService.getReservations(
      {
        page: query.page,
        limit: query.limit,
      },
      query,
    );
  }
}
