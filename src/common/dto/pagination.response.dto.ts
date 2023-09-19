import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IPaginationMeta, Pagination } from "nestjs-typeorm-paginate";

class PaginationResponseMetaDto implements IPaginationMeta {
  constructor(partial?: Partial<PaginationResponseMetaDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  @ApiProperty({
    example: 2,
    required: true,
  })
  public itemCount: number;

  @Expose()
  @ApiProperty({
    example: 45,
    required: true,
  })
  public totalItems?: number;

  @Expose()
  @ApiProperty({
    example: 10,
    required: true,
  })
  public itemsPerPage: number;

  @Expose()
  @ApiProperty({
    example: 3,
    required: true,
  })
  public totalPages?: number;

  @Expose()
  @ApiProperty({
    example: 1,
    required: true,
  })
  public currentPage: number;

  [s: string]: unknown;
}

export abstract class PaginationResponseDto<ItemType = unknown> extends Pagination<ItemType, PaginationResponseMetaDto> {
  protected constructor(items: Array<ItemType>, meta: PaginationResponseMetaDto) {
    super(items, meta);
  }

  public abstract items: Array<ItemType>;

  @Type(() => PaginationResponseMetaDto)
  @Expose()
  public meta: PaginationResponseMetaDto;
}
