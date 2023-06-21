import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { UserRoles } from 'src/enums';

export class UserRoleAssignDTO {
	@ApiProperty({
		type: 'rolesName[]',
		example: [UserRoles.ADMIN, UserRoles.INDIVIDUAL],
	})
	@IsArray()
	// @IsIn(Object.values(UserRoles))
	roles: UserRoles[];
}
export class UserRoleRemoveDTO {
	@ApiProperty({
		type: 'rolesName[]',
		example: [UserRoles.ADMIN, UserRoles.INDIVIDUAL],
	})
	@IsArray()
	// @IsIn(Object.values(UserRoles))
	roles: UserRoles[];
}
