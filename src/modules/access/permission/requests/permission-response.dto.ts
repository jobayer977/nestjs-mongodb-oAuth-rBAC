import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponseDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	active: boolean;
}
