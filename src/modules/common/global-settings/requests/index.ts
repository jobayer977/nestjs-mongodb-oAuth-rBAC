import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateGlobalSettingsDto {
	@ApiProperty({
		required: false,
	})
	@IsNumber()
	commission: number;
}
