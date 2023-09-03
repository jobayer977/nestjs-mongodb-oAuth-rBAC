import { GlobalSettings, GlobalSettingsSchema } from './global-settings.entity';

import { GlobalSettingsController } from './global-settings.controller';
import { GlobalSettingsService } from './global-settings.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/*
https://docs.nestjs.com/modules
*/

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: GlobalSettings.name, schema: GlobalSettingsSchema },
		]),
	],
	controllers: [GlobalSettingsController],
	providers: [GlobalSettingsService],
	exports: [GlobalSettingsService],
})
export class GlobalSettingsModule {}
