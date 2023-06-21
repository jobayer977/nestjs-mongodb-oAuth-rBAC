import {
	IsNotEmpty,
	IsString,
	Length,
	Matches,
	MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BaseFilterRequestDTO } from 'src/base/base.request';

export class FilterRolesRequestDto extends BaseFilterRequestDTO {
	@ApiProperty({
		required: false,
	})
	name: string;

	@ApiProperty({
		required: false,
	})
	description: string;
}

export class CreateRoleRequestDto {
	@ApiProperty()
	@IsNotEmpty()
	@MaxLength(60)
	name: string;

	@ApiProperty()
	description: string;
}
export class UpdateRoleRequestDto {
	@ApiProperty()
	@IsNotEmpty()
	@MaxLength(60)
	name: string;

	@ApiProperty()
	description: string;
}

export class AssignPermissionDTO {
	@ApiProperty({
		type: [String],
		example: 'ADMIN',
	})
	@IsNotEmpty()
	@IsString()
	permission: string;
}
