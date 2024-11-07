import { Controller, Get } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { RequirePermissions } from 'src/permissions/permissions.decorator';
import { Public } from 'src/auth/auth.guard';

@Controller('themes')
export class ThemesController {
    constructor(private themeService: ThemesService) {}

    // @RequirePermissions('read')
    @Public()
    @Get('')
    findAll() {
        return this.themeService.findAll();
    }
}
