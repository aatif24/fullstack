import {
    Controller,
    Get,
    UseGuards,
    Request,
    Query,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { RequirePermissions } from 'src/roles/permissions.decorator';
import { UsersService } from './users.service';
import { IUserQueryParams } from './dto/fetchUsers.dto';
import { CreateUserDto } from './dto/createUser.dto';

@UseGuards(AuthGuard)
@Controller({ version: '1', path: 'users' })
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

    @RequirePermissions('users:create')
    @Post('')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @RequirePermissions('users:read')
    @Get('')
    findAll(@Query() filters: IUserQueryParams) {
        return this.usersService.findAll(filters);
    }

    @RequirePermissions('users:archive')
    @Delete('/:id')
    archive(@Param('id') id) {
        return this.usersService.archive(id);
    }

    @RequirePermissions('users:update')
    @Put('/un-archive/:id')
    unArchive(@Param('id') id) {
        return this.usersService.unArchive(id);
    }
}
