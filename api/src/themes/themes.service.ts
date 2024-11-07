import { Inject, Injectable } from '@nestjs/common';
import { ITheme } from './entitites/theme.entity';
import { Model } from 'mongoose';

@Injectable()
export class ThemesService {
    constructor(
        @Inject('THEME_MODEL')
        private themeModel: Model<ITheme>,
    ) {}

    async findAll(): Promise<ITheme[]> {
        // await new this.themeModel({
        //     name:"theme-1",
        //     background: {
        //         dark: "210 14.3% 4.1%",
        //         light: "0 0% 100%"
        //     },
        //     foreground: {
        //         dark: "210 9.1% 97.8%",
        //         light: "20 14.3% 4.1%"
        //     }
        // }).save();
        return this.themeModel.find();
    }
}
