import { Module } from '@nestjs/common';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';
import { ThemesProviders } from './themes.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ThemesController],
  providers: [ThemesService, ...ThemesProviders]
})
export class ThemesModule { }
