import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { Repository } from "typeorm";

import { ListReservationsQuery } from "./dto/list-reservations.query.dto";
import { Reservation } from "./entities/reservation.entity";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async getReservations(options: IPaginationOptions, query: ListReservationsQuery): Promise<Pagination<object>> {
    const paginationObject = await paginate<Reservation>(this.reservationRepository, options, {});

    return paginationObject;
  }
}
