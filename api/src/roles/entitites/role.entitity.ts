import * as mongoose from 'mongoose';
import { IUser } from 'src/users/entities/users.entity';
import { IPermission } from './permission.entity';

export interface IRole {
    id: string;
    name: string;
    permissions: IPermission[];
    createdBy: IUser;
    updatedBy: IUser;
}

export const RoleSchema = new mongoose.Schema<IRole>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        permissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Permission',
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true, id: true, toJSON: { virtuals: true } },
);

RoleSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
