import { Inject, Injectable } from '@nestjs/common';
import { IRole } from './entitites/role.entitity';
import { Model } from 'mongoose';
import { IPermission } from './entitites/permission.entity';
import { ModulesService } from 'src/modules/modules.service';
import { IRoleQueryParams } from './dto/fetchRoles.dto';

@Injectable()
export class RolesService {
    constructor(
        @Inject('ROLE_MODEL')
        private roleModel: Model<IRole>,
        @Inject('PERMISSION_MODEL')
        private permissionModel: Model<IPermission>,
        private modulesService: ModulesService,
    ) { }

    // async firstSet() {
    //     return;
    //     const modules = await this.modulesService.findAll();

    //     const permissions = [];
    //     modules.forEach((module) => {
    //         const readPermission = new this.permissionModel({
    //             permission: 'read',
    //             module: module,
    //             createdBy: '671135eece8a2e3655807293',
    //         });
    //         readPermission.save();
    //         permissions.push(readPermission);
    //         const updatePermission = new this.permissionModel({
    //             permission: 'update',
    //             module: module,
    //             createdBy: '671135eece8a2e3655807293',
    //         });
    //         updatePermission.save();
    //         permissions.push(updatePermission);

    //         const archivePermission = new this.permissionModel({
    //             permission: 'archive',
    //             module: module,
    //             createdBy: '671135eece8a2e3655807293',
    //         });
    //         archivePermission.save();
    //         permissions.push(archivePermission);
    //         const writePermission = new this.permissionModel({
    //             permission: 'write',
    //             module: module,
    //             createdBy: '671135eece8a2e3655807293',
    //         });
    //         writePermission.save();
    //         permissions.push(writePermission);
    //     });

    //     const newRole = new this.roleModel({
    //         name: 'Admin',
    //         permissions,
    //         createdBy: '671135eece8a2e3655807293',
    //     });
    //     newRole.save();
    //     return;
    // }


    async findAll({
        page = 1,
        limit = 10,
        q = '',
        sortBy,
        sortOrder,
    }: IRoleQueryParams): Promise<{
        roles: IRole[];
        totalPages: number;
        currentPage: number;
        totalUsers: number;
    }> {
        try {
            const query: { [key: string]: string | boolean | number | object } =
            {
                isArchived: { $ne: true },
                isSuperAdmin: { $ne: true },
            };

            // If a search term is provided, use regex to search on the email field (case-insensitive)
            if (q) {
                query.$or = [
                    { name: { $regex: q, $options: 'i' } }, // Searching in the name field as well
                ];
            }

            // Fetch roles with pagination and search filter
            const roles = await this.roleModel
                .find(query)
                .sort({ [sortBy]: sortOrder == 'asc' ? 1 : -1 })
                .skip((page - 1) * limit) // Skip based on the page
                .limit(limit) // Limit the number of results
                .populate({ path: 'permissions', populate: { path: 'module' } }); // Execute the query

            // Get the total count of matching roles
            const totalCount = await this.roleModel.countDocuments(query);

            // Return the roles and pagination details
            return {
                roles,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalUsers: totalCount,
            };
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw new Error('Could not fetch roles');
        }
    }
}
