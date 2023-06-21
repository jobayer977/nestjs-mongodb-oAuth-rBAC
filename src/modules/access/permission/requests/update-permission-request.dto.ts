import { IsBoolean, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreatePermissionRequestDto } from './create-permission-request.dto';

export class UpdatePermissionRequestDto extends CreatePermissionRequestDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsBoolean()
	active: boolean;
}
