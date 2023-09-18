import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Dictionary, groupBy } from "lodash";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { Equal, FindManyOptions, FindOptionsWhere, Repository } from "typeorm";

import { SortOptions } from "../../common/constants";
import { ListReservationsQuery, ListReservationsResponseDto } from "./dto";
import { Reservation } from "./entities";

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

  async getGroupedReservationsByUserId(userId: string): Promise<Dictionary<ListReservationsResponseDto>> {
    const findManyOptionsQuery = this.generateFindManyOptionsQuery({
      userId: Equal(userId),
    });

    const reservation = await this.reservationRepository.find(findManyOptionsQuery);

    return groupBy(
      reservation.map(this.mapReservationToDto),
      item => item.date,
    ) as unknown as Dictionary<ListReservationsResponseDto>;
  }

  private generateFindManyOptionsQuery(filter: FindOptionsWhere<Reservation>): FindManyOptions<Reservation> {
    return {
      relations: { amenity: true },
      order: { startTime: SortOptions.ASC },
      where: filter,
    };
  }

  private mapReservationToDto({ id, userId, amenity, startTime, endTime, date }: Reservation): ListReservationsResponseDto {
    return {
      id,
      userId,
      amenityName: amenity.name,
      startTime: `${Math.floor(startTime / 60)}:${startTime % 60}`,
      duration: endTime - startTime,
      date: date,
    };
  }
}
