import { Inject, Injectable } from '@nestjs/common';
import { IRole } from './entitites/role.entitity';
import { Model } from 'mongoose';
import { IPermission } from './entitites/permission.entity';

@Injectable()
export class RolesService {
    constructor(
        @Inject('ROLE_MODEL')
        private roleModel: Model<IRole>,
        @Inject('PERMISSION_MODEL')
        private permissionModel: Model<IPermission>,
    ) {}

    async create() {
        const newPermission = new this.permissionModel({
            key: 'users.read',
        });
        newPermission.save();

        const newRole = new this.roleModel({
            name: 'Admin',
            permissions: [newPermission],
        });
        newRole.save();
        return newRole;
    }

    async findAll(): Promise<IRole[]> {
        return this.roleModel.find();
    }
}
