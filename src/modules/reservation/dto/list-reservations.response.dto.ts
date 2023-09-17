import { Expose } from "class-transformer";

export class ListReservationsResponseDto {
  @Expose()
  public id: string;

  @Expose()
  public userId: string;

  @Expose()
  public startTime: number;

  @Expose()
  public amenityName: string;
}
