import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IPermission } from './entitites/permission.entity';
import { IPermissionsQueryParams } from './dto/fetchPermissions.dto';
import { IModule } from 'src/modules/entitites/module.entitity';
import { IUser } from 'src/users/entities/users.entity';

const defaultPermissions = ['read', 'write', 'archive', 'update'];

@Injectable()
export class PermissionsService {
    constructor(
        @Inject('PERMISSION_MODEL')
        private permissionModel: Model<IPermission>,
    ) {}

    async createPermissionsForModule(
        module: IModule,
        user: IUser,
    ): Promise<IPermission[]> {
        return await Promise.all(
            defaultPermissions.map((p) => {
                const permission = new this.permissionModel({
                    permission: p,
                    module,
                    createdBy: user,
                });
                return permission.save();
            }),
        );
    }

    async findAll({
        page = 1,
        limit = 10,
        q = '',
        sortBy,
        sortOrder,
    }: IPermissionsQueryParams): Promise<{
        permissions: IPermission[];
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

            // Fetch permissions with pagination and search filter
            const permissions = await this.permissionModel
                .find(query)
                .sort({ [sortBy]: sortOrder == 'asc' ? 1 : -1 })
                .skip(limit == 'all' ? undefined : (page - 1) * limit) // Skip based on the page
                .limit(limit == 'all' ? undefined : limit) // Limit the number of results
                .populate({ path: 'module' }); // Execute the query

            // Get the total count of matching permissions
            const totalCount = await this.permissionModel.countDocuments(query);

            // Return the permissions and pagination details
            return {
                permissions,
                totalPages: limit == 'all' ? 1 : Math.ceil(totalCount / limit),
                currentPage: page,
                totalUsers: totalCount,
            };
        } catch (error) {
            console.error('Error fetching permissions:', error);
            throw new Error('Could not fetch permissions');
        }
    }
}
