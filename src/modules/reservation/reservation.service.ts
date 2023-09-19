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

  /**
   * Get paginated reservations by filters
   *
   * @param {IPaginationOptions} options - Pagination options
   * @param {ListReservationsQuery} query - Filters: day and amenityId
   * @returns {Pagination<ListReservationsResponseDto>} List paginated reservations
   */
  async getReservations(
    options: IPaginationOptions,
    query: ListReservationsQuery,
  ): Promise<Pagination<ListReservationsResponseDto>> {
    const { amenityId, day } = query;

    const findManyOptionsQuery = this.generateFindManyReservationsQuery({
      amenity: { id: Equal(amenityId.toString()) },
      date: Equal(day.toString()),
    });

    const paginationObject = await paginate<Reservation>(this.reservationRepository, options, findManyOptionsQuery);

    const mappedPaginationObject = paginationObject.items.map(this.mapReservationToDto);

    return new Pagination<ListReservationsResponseDto>(mappedPaginationObject, paginationObject.meta);
  }

  /**
   * Get grouped by userId reservations
   *
   * @param {string} userId - UserId
   * @returns {Dictionary<ListReservationsResponseDto>} Grouped reservations
   */
  async getGroupedReservationsByUserId(userId: string): Promise<Dictionary<ListReservationsResponseDto>> {
    const findManyOptionsQuery = this.generateFindManyReservationsQuery({
      userId: Equal(userId),
    });

    const reservation = await this.reservationRepository.find(findManyOptionsQuery);

    //Using lodash here because typeorm repository pattern does not support groupBy
    return groupBy(
      reservation.map(this.mapReservationToDto),
      item => item.date,
    ) as unknown as Dictionary<ListReservationsResponseDto>;
  }

  /**
   * Generate find many reservations query
   *
   * @param {FindOptionsWhere<Reservation>} filter - Find criterias
   * @returns {FindManyOptions<Reservation>} Query
   */
  private generateFindManyReservationsQuery(filter: FindOptionsWhere<Reservation>): FindManyOptions<Reservation> {
    return {
      relations: { amenity: true },
      order: { startTime: SortOptions.ASC },
      where: filter,
    };
  }

  /**
   * Map reservation item to response dto
   *
   * @param {Reservation} { id, userId, amenity, startTime, endTime, date } - Reservation entity to map
   * @returns {ListReservationsResponseDto} Mapped reservation
   */
  private mapReservationToDto({ id, userId, amenity, startTime, endTime, date }: Reservation): ListReservationsResponseDto {
    const minutes = (startTime % 60).toString().padStart(2, "0");
    const hours = Math.floor(startTime / 60)
      .toString()
      .padStart(2, "0");

    return {
      id,
      userId,
      amenityName: amenity.name,
      startTime: `${hours}:${minutes}`,
      duration: endTime - startTime,
      date: date,
    };
  }
}
