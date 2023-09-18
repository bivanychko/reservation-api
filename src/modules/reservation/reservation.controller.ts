import { Controller, Get, Param, Query, Version } from "@nestjs/common";
import { Dictionary } from "lodash";

import { Versions } from "../../common/constants";
import { PaginationResponseDto } from "../../common/dto";
import { ListReservationsQuery, ListReservationsResponseDto } from "./dto";
import { ReservationService } from "./reservation.service";

@Controller("/reservations")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @Version(Versions.V1)
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
  @Version(Versions.V1)
  listReservationsByUserId(@Param("userId") userId: string): Promise<Dictionary<ListReservationsResponseDto>> {
    return this.reservationService.getGroupedReservationsByUserId(userId);
  }
}
