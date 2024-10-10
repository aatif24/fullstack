import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model, MongooseError } from 'mongoose';
import { IUser } from './entities/users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { IUserQueryParams } from './dto/fetchUsers.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<IUser>,
    ) {}

    async create(user: CreateUserDto): Promise<IUser> {
        try {
            const newUser = new this.userModel(user);
            return (await newUser.save()).toJSON();
        } catch (error) {
            if (error?.code == 11000) {
                throw new BadRequestException();
            }
        }
    }

    async findOneByEmail(email: string): Promise<IUser | undefined> {
        return this.userModel.findOne({ email });
    }

    async archive(id: string): Promise<void> {
        return this.userModel.findByIdAndUpdate(id, {
            $set: { isArchived: true },
        });
    }

    async unArchive(id: string): Promise<void> {
        return this.userModel.findByIdAndUpdate(id, {
            $set: { isArchived: false },
        });
    }

    // The function to fetch users with pagination and search filter on the email field
    async findAll({
        page = 1,
        limit = 10,
        q = '',
        sortBy,
        sortOrder,
    }: IUserQueryParams): Promise<{
        users: IUser[];
        totalPages: number;
        currentPage: number;
        totalUsers: number;
    }> {
        try {
            const query: { [key: string]: string | boolean | number | object } =
                {
                    isArchived: { $ne: true },
                };

            // If a search term is provided, use regex to search on the email field (case-insensitive)
            if (q) {
                query.$or = [
                    { email: { $regex: q, $options: 'i' } }, // 'i' makes it case-insensitive
                    { name: { $regex: q, $options: 'i' } }, // Searching in the name field as well
                ];
            }

            // Fetch users with pagination and search filter
            const users = await this.userModel
                .find(query)
                .sort({ [sortBy]: sortOrder == 'asc' ? 1 : -1 })
                .skip((page - 1) * limit) // Skip based on the page
                .limit(limit) // Limit the number of results
                .populate('roles'); // Execute the query

            // Get the total count of matching users
            const totalCount = await this.userModel.countDocuments(query);

            // Return the users and pagination details
            return {
                users,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                totalUsers: totalCount,
            };
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Could not fetch users');
        }
    }
}
