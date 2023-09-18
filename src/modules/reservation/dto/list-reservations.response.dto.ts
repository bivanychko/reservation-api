import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ListReservationsResponseDto {
  @Expose()
  @ApiProperty({
    example: "1",
  })
  public id: string;

  @Expose()
  @ApiProperty({
    example: "5",
  })
  public userId: string;

  @Expose()
  @ApiProperty({
    example: "10:00",
  })
  public startTime: string;

  @Expose()
  @ApiProperty({
    example: "Tetra Technologies, Inc.",
  })
  public amenityName: string;

  @Expose()
  @ApiProperty({
    example: 400,
  })
  public duration: number;

  @Expose()
  @ApiProperty({
    example: "1590105600000",
  })
  public date: string;
}
