import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RequirePermissions } from '../permissions/permissions.decorator';
import { IRoleQueryParams } from './dto/fetchRoles.dto';
import { CreateRoleDto } from './dto/createRole.dto';

@Controller({ version: '1', path: 'roles' })
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @RequirePermissions('read')
    @Get('')
    findAll(@Query() filters: IRoleQueryParams) {
        return this.rolesService.findAll(filters);
    }

    @RequirePermissions('write')
    @Post('')
    create(@Body() role: CreateRoleDto, @Request() req) {
        return this.rolesService.create(role, req.user);
    }

    /** project setup */
    @RequirePermissions('create')
    @Post('createFirstSet')
    firstSet() {
        return;
        // return this.rolesService.firstSet();
    }
}
