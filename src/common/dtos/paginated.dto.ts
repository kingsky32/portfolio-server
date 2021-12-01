import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  page?: number;
  limit?: number;
  offset?: number;
}

export class PaginatedDto<TData> {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  limit: number;

  @ApiProperty({ type: Number })
  offset: number;

  @ApiProperty({ type: Array })
  results: TData[];
}
