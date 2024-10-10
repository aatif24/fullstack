import * as mongoose from 'mongoose';
import { IUser } from 'src/users/entities/users.entity';

export interface IPermission {
    id: string;
    key: string;
    createdBy: IUser;
    updatedBy: IUser;
}

export const PermissionSchema = new mongoose.Schema<IPermission>(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
    },
    { timestamps: true, id: true, toJSON: { virtuals: true } },
);

PermissionSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
