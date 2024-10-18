import { IsOptional } from 'class-validator';

export class IModuleQueryParams {
    @IsOptional()
    page: number;

    @IsOptional()
    limit: number;

    @IsOptional()
    sortBy: 'name';

    @IsOptional()
    sortOrder: 'asc' | 'desc';

    @IsOptional()
    q: string;
}
