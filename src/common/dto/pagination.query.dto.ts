import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Max } from "class-validator";

export const MAX_LIMIT_VALUE = 100;
const DEFAULT_PER_PAGE = 10;

export class PaginationQueryDto {
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  public page: number = 1;

  @Max(MAX_LIMIT_VALUE)
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  public limit: number = DEFAULT_PER_PAGE;
}
