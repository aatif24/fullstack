import { IsOptional } from 'class-validator';

export class IUserQueryParams {
    @IsOptional()
    page: number;

    @IsOptional()
    limit: number;

    @IsOptional()
    sortBy: 'name' | 'email';

    @IsOptional()
    sortOrder: 'asc' | 'desc';

    @IsOptional()
    q: string;
}
