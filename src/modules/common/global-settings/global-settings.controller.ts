/*
https://docs.nestjs.com/controllers#controllers
*/

import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Put } from '@nestjs/common';

import { GlobalSettingsService } from './global-settings.service';
import { UpdateGlobalSettingsDto } from './requests';

@Controller('global-settings')
@ApiTags('Global Settings')
export class GlobalSettingsController {
	constructor(private readonly globalSettingsService: GlobalSettingsService) {}

	@Put()
	@ApiProperty({
		type: UpdateGlobalSettingsDto,
	})
	async update(@Body() payload: UpdateGlobalSettingsDto) {
		return await this.globalSettingsService.updateOrCreate(payload);
	}
}
