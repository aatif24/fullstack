import * as mongoose from 'mongoose';
import { IUser } from 'src/users/entities/users.entity';

export interface IModule {
    id: string;
    name: string;
    createdBy: IUser;
    updatedBy: IUser;
}

export const ModuleSchema = new mongoose.Schema<IModule>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            index: true,
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

ModuleSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
