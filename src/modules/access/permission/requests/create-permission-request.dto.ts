import { IsNotEmpty, Length, Matches, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionRequestDto {
	@ApiProperty()
	@IsNotEmpty()
	@MaxLength(60)
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@Length(3, 160)
	description: string;
}
