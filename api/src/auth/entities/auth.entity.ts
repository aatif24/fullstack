import * as mongoose from 'mongoose';
import { IUser } from 'src/users/entities/users.entity';

export interface IAuth {
    id?: string;
    user: IUser;
    token: string;
}

export const AuthSchema = new mongoose.Schema<IAuth>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        token: { type: String, required: true },
    },
    { timestamps: true, id: true, toJSON: { virtuals: true } },
);

AuthSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
