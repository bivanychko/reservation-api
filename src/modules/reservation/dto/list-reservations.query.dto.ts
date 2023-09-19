import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

import { PaginationQueryDto } from "../../../common/dto";

export class ListReservationsQuery extends PaginationQueryDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    example: "4",
    required: true,
  })
  public amenityId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    example: "1590105600000",
    required: true,
  })
  public day: number;
}
