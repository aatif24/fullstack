import * as mongoose from 'mongoose';
import { IRole } from 'src/roles/entitites/role.entitity';
import * as bcrypt from 'bcrypt';
export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    isArchived: boolean;
    roles: IRole[];
}

export const UserSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        password: { type: String, required: true },
        isArchived: { type: Boolean },
        roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    },
    { timestamps: true, id: true, toJSON: { virtuals: true } },
);

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 4);
});

UserSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
