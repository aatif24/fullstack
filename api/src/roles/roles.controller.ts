import { Controller, Get, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RequirePermissions } from './permissions.decorator';
import { IRoleQueryParams } from './dto/fetchRoles.dto';

@Controller({ version: '1', path: 'roles' })
export class RolesController {
    constructor(private rolesService: RolesService) { }

    @RequirePermissions('read')
    @Get('')
    findAll(@Query() filters: IRoleQueryParams) {
        return this.rolesService.findAll(filters);
    }

    /** project setup */
    @RequirePermissions('create')
    @Post('createFirstSet')
    firstSet() {
        return
        // return this.rolesService.firstSet();
    }
}
