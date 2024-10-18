import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IModule } from './entitites/module.entitity';
import { IModuleQueryParams } from './dto/fetchModules.dto';

@Injectable()
export class ModulesService {
    constructor(
        @Inject('FEATURE_MODEL')
        private moduleModel: Model<IModule>,
    ) {}

    // async create() {
    //     const newModule = new this.moduleModel({
    //         key: 'modules'
    //     });
    //     newModule.save();
    //     return newModule;
    // }

    async findAll({
        page = 1,
        limit = 10,
        q = '',
        sortBy,
        sortOrder,
    }: IModuleQueryParams): Promise<{
        modules: IModule[];
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

            // Fetch modules with pagination and search filter
            const modules = await this.moduleModel
                .find(query)
                .sort({ [sortBy]: sortOrder == 'asc' ? 1 : -1 })
                .skip((page - 1) * limit) // Skip based on the page
                .limit(limit) // Limit the number of results

            // Get the total count of matching modules
            const totalCount = await this.moduleModel.countDocuments(query);

            // Return the modules and pagination details
            return {
                modules,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalUsers: totalCount,
            };
        } catch (error) {
            console.error('Error fetching modules:', error);
            throw new Error('Could not fetch modules');
        }
    }
}
