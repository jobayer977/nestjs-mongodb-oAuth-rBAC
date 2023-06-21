import { IsNotEmpty, Length, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterRequestDTO } from 'src/base/base.request';

export class FilterPermissionRequestDto extends BaseFilterRequestDTO {
	@ApiProperty({
		required: false,
	})
	name: string;

	@ApiProperty({
		required: false,
	})
	description: string;
}
