import * as mongoose from 'mongoose';
import { IModule } from 'src/modules/entitites/module.entitity';
import { IUser } from 'src/users/entities/users.entity';

enum EAccess {
    Read = 'read',
    Write = 'write',
    Update = 'update',
    Archive = 'archive',
}

export interface IPermission {
    id: string;
    module: IModule;
    permission: EAccess;
    createdBy: IUser;
    updatedBy: IUser;
}

export const PermissionSchema = new mongoose.Schema<IPermission>(
    {
        module: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Module',
            required: true,
        },
        permission: {
            type: String,
            enum: Object.values(EAccess),
            required: true,
        },
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

// Exclude the internal _id from the JSON response
PermissionSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
