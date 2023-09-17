import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

import { PaginationQueryDto } from "../../../common/dto/pagination.query.dto";

export class ListReservationsQuery extends PaginationQueryDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  public amenityId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Type(() => Number)
  public day: number;
}
