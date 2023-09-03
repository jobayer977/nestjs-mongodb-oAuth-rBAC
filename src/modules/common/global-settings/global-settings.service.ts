/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { GlobalSettings } from './global-settings.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GlobalSettingsService extends BaseService<GlobalSettings> {
	constructor(
		@InjectModel(GlobalSettings.name)
		readonly globalSettingsModel: Model<GlobalSettings>
	) {
		super(globalSettingsModel);
	}

	async updateOrCreate(payload: Partial<GlobalSettings>) {
		const globalSettings = await this.globalSettingsModel.findOne();
		if (globalSettings) {
			return await this.globalSettingsModel.findByIdAndUpdate(
				globalSettings._id,
				payload,
				{ new: true }
			);
		} else {
			return await this.globalSettingsModel.create(payload);
		}
	}
}
