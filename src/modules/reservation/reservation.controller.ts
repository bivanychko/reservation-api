import { Controller, Get, Param, Query, Version } from "@nestjs/common";
import { Dictionary } from "lodash";

import { PaginationResponseDto } from "../../common/dto";
import { ListReservationsQuery, ListReservationsResponseDto } from "./dto";
import { ReservationService } from "./reservation.service";

@Controller("/reservations")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @Version("1.0")
  listReservations(@Query() query: ListReservationsQuery): Promise<PaginationResponseDto<ListReservationsResponseDto>> {
    return this.reservationService.getReservations(
      {
        page: query.page,
        limit: query.limit,
      },
      query,
    );
  }

  @Get("/:userId")
  @Version("1.0")
  listReservationsByUserId(@Param("userId") userId: string): Promise<Dictionary<ListReservationsResponseDto>> {
    return this.reservationService.getGroupedReservationsByUserId(userId);
  }
}
