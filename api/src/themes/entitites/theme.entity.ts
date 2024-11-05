import * as mongoose from 'mongoose';

interface IMode {
    dark: string;
    light: string;
}

export interface ITheme {
    id: string;
    name: string;
    background: IMode;
    foreground: IMode;
    radius: string;
}

export const ThemeModeSchema = new mongoose.Schema<IMode>({
    dark: { type: String, default: null },
    light: { type: String, default: null },
});

export const ThemeSchema = new mongoose.Schema<ITheme>(
    {
        name: { type: String, default: null },
        background: { type: ThemeModeSchema, default: null },
        foreground: { type: ThemeModeSchema, default: null },
        radius: { type: String, default: null }
    },
    { timestamps: true, id: true, toJSON: { virtuals: true } },
);
// Exclude the internal _id from the JSON response
ThemeSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
