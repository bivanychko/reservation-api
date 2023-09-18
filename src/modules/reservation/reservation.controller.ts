import { Controller, Get, Param, Query, Version } from "@nestjs/common";
import { ApiBadRequestResponse, ApiHeader, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Dictionary } from "lodash";

import { Headers, Versions } from "../../common/constants";
import { PaginationResponseDto } from "../../common/dto";
import { ListReservationsQuery, ListReservationsResponseDto } from "./dto";
import { ReservationService } from "./reservation.service";

@Controller("/reservations")
@ApiHeader({
  name: Headers.VERSION,
  description: "Version of data to retrieve",
  required: true,
  schema: {
    enum: [Versions.V1],
  },
})
@ApiTags("Reservations")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: ListReservationsResponseDto })
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
  @ApiBadRequestResponse()
  @ApiOkResponse({ type: ListReservationsResponseDto })
  @Version(Versions.V1)
  listReservationsByUserId(@Param("userId") userId: string): Promise<Dictionary<ListReservationsResponseDto>> {
    return this.reservationService.getGroupedReservationsByUserId(userId);
  }
}
