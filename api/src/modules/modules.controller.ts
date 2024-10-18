import { Controller, Get, Query } from '@nestjs/common';
import { ModulesService } from './modules.service';

import { IModuleQueryParams } from './dto/fetchModules.dto';
import { RequirePermissions } from 'src/roles/permissions.decorator';

@Controller({ version: '1', path: 'modules' })
export class ModulesController {
    constructor(private modulesService: ModulesService) { }

    @RequirePermissions('read')
    @Get('')
    findAll(@Query() filter: IModuleQueryParams) {
        return this.modulesService.findAll(filter);
    }
}
