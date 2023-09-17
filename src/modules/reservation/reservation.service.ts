import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { Equal, Repository } from "typeorm";

import { ListReservationsQuery } from "./dto/list-reservations.query.dto";
import { ListReservationsResponseDto } from "./dto/list-reservations.response.dto";
import { Reservation } from "./entities/reservation.entity";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async getReservations(
    options: IPaginationOptions,
    query: ListReservationsQuery,
  ): Promise<Pagination<ListReservationsResponseDto>> {
    const { amenityId, day } = query;

    const paginationObject = await paginate<Reservation>(this.reservationRepository, options, {
      relations: { amenity: true },
      where: { amenity: { id: Equal(amenityId.toString()) }, date: Equal(day.toString()) },
      order: { startTime: "ASC" },
    });

    const mappedPaginationObject = paginationObject.items.map(item => {
      return {
        id: item.id,
        userId: item.userId,
        startTime: this.getTime(item.startTime),
        amenityName: item.amenity.name,
        duration: item.startTime - item.endTime,
      };
    });

    return new Pagination<ListReservationsResponseDto>(mappedPaginationObject, paginationObject.meta);
  }

  private getTime(timeInMinutes: number): string {
    return `${Math.floor(timeInMinutes / 60)}:${timeInMinutes % 60}`;
  }
}
