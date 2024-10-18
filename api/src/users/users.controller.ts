import {
    Controller,
    Get,
    Request,
    Query,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Req,
} from '@nestjs/common';

import { Public } from 'src/auth/auth.guard';
import { RequirePermissions } from 'src/permissions/permissions.decorator';
import { UsersService } from './users.service';
import { IUserQueryParams } from './dto/fetchUsers.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Controller({ version: '1', path: 'users' })
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Get('createAdmin')
    createAdmin() {
        return this.usersService.createAdmin();
    }

    @RequirePermissions('create')
    @Post('')
    createUser(@Req() req, @Body() createUserDto: CreateUserDto) {
        createUserDto.createdBy = req.user;
        return this.usersService.create(createUserDto);
    }

    @RequirePermissions('read')
    @Get('')
    findAll(@Query() filters: IUserQueryParams) {
        return this.usersService.findAll(filters);
    }

    @RequirePermissions('read')
    @Get('/:id')
    getUser(@Param('id') id) {
        return this.usersService.getUser(id);
    }

    @RequirePermissions('archive')
    @Delete('/:id')
    archive(@Param('id') id) {
        return this.usersService.archive(id);
    }

    @RequirePermissions('update')
    @Put('/un-archive/:id')
    unArchive(@Param('id') id) {
        return this.usersService.unArchive(id);
    }
}
