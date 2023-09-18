import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { groupBy } from "lodash";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { Equal, FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

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

    const findManyOptionsQuery = this.generateFindManyOptionsQuery({
      amenity: { id: Equal(amenityId.toString()) },
      date: Equal(day.toString()),
    });

    const paginationObject = await paginate<Reservation>(this.reservationRepository, options, findManyOptionsQuery);

    const mappedPaginationObject = paginationObject.items.map(this.mapReservationToDto);

    return new Pagination<ListReservationsResponseDto>(mappedPaginationObject, paginationObject.meta);
  }

  async getGroupedReservationsByUserId(userId: string): Promise<unknown> {
    const findManyOptionsQuery = this.generateFindManyOptionsQuery({
      userId: Equal(userId),
    });

    const reservation = await this.reservationRepository.find(findManyOptionsQuery);

    return groupBy(reservation.map(this.mapReservationToDto), item => item.date);
  }

  private generateFindManyOptionsQuery(filter: FindOptionsWhere<Reservation>): FindManyOptions<Reservation> {
    return {
      relations: { amenity: true },
      order: { startTime: "ASC" },
      where: filter,
    };
  }

  private mapReservationToDto({ id, userId, amenity, startTime, endTime, date }: Reservation): ListReservationsResponseDto {
    console.log({ id, userId, amenity, startTime, endTime, date });

    return {
      id,
      userId,
      amenityName: amenity.name,
      startTime: `${Math.floor(startTime / 60)}:${startTime % 60}`,
      duration: startTime - endTime,
      date: date,
    };
  }
}
