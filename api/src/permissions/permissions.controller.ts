import { Controller, Get, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { IPermissionsQueryParams } from './dto/fetchPermissions.dto';
import { RequirePermissions } from './permissions.decorator';

@Controller('permissions')
export class PermissionsController {

    constructor(private permissionsService: PermissionsService) { }

    @RequirePermissions('read')
    @Get('')
    findAll(@Query() filters: IPermissionsQueryParams) {
        return this.permissionsService.findAll(filters);
    }
}
