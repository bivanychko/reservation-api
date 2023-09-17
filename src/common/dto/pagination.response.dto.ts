import { Expose, Type } from "class-transformer";
import { IPaginationMeta, Pagination } from "nestjs-typeorm-paginate";

class PaginationResponseMetaDto implements IPaginationMeta {
  constructor(partial?: Partial<PaginationResponseMetaDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  public itemCount: number;

  @Expose()
  public totalItems?: number;

  @Expose()
  public itemsPerPage: number;

  @Expose()
  public totalPages?: number;

  @Expose()
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
