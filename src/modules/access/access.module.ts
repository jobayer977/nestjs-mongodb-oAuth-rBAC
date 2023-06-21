/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';
import { Permission, PermissionSchema } from './permission/permission.entity';
import { RoleSchema, Roles } from './roles/roles.entity';

import { MongooseModule } from '@nestjs/mongoose';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { UserModule } from '../users/user.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Permission.name,
				schema: PermissionSchema,
			},
			{
				name: Roles.name,
				schema: RoleSchema,
			},
		]),
	],
	controllers: [PermissionController, RolesController],
	providers: [PermissionService, RolesService],
	exports: [PermissionService, RolesService],
})
export class AccessModule {}
