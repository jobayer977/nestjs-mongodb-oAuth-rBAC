/*
https://docs.nestjs.com/modules
*/

import { RoleSchema, Roles } from './roles/roles.entity';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Roles.name,
				schema: RoleSchema,
			},
		]),
	],
	controllers: [RolesController],
	providers: [RolesService],
	exports: [RolesService],
})
export class AccessModule {}
