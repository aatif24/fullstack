import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller({ version: '1', path: 'roles' })
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Get('')
    findAll() {
        return this.rolesService.findAll();
    }

    @Post('create')
    getProfile() {
        return this.rolesService.create();
    }
}
