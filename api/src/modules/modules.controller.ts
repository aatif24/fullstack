import { Body, Controller, Get, Post, Query, Req, Request } from '@nestjs/common';
import { ModulesService } from './modules.service';

import { IModuleQueryParams } from './dto/fetchModules.dto';
import { RequirePermissions } from 'src/permissions/permissions.decorator';
import { CreateModuleDto } from './dto/createUser.dto';

@Controller({ version: '1', path: 'modules' })
export class ModulesController {
    constructor(private modulesService: ModulesService) { }

    @RequirePermissions('read')
    @Get('')
    findAll(@Query() filter: IModuleQueryParams) {
        return this.modulesService.findAll(filter);
    }

    @RequirePermissions('read')
    @Post('')
    create(@Body() module: CreateModuleDto, @Request() req) {
        return this.modulesService.create(module, req.user);
    }
}
