import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ListReservationsResponseDto {
  @Expose()
  @ApiProperty({
    example: "1",
    required: true,
  })
  public id: string;

  @Expose()
  @ApiProperty({
    example: "5",
    required: true,
  })
  public userId: string;

  @Expose()
  @ApiProperty({
    example: "10:00",
    required: true,
  })
  public startTime: string;

  @Expose()
  @ApiProperty({
    example: "Tetra Technologies, Inc.",
    required: true,
  })
  public amenityName: string;

  @Expose()
  @ApiProperty({
    example: 400,
    required: true,
  })
  public duration: number;

  @Expose()
  @ApiProperty({
    example: "1590105600000",
    required: true,
  })
  public date: string;
}
