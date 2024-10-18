import { IsOptional } from 'class-validator';

export class IPermissionsQueryParams {
    @IsOptional()
    page: number;

    @IsOptional()
    limit: number|'all';

    @IsOptional()
    sortBy: 'name';

    @IsOptional()
    sortOrder: 'asc' | 'desc';

    @IsOptional()
    q: string;
}
