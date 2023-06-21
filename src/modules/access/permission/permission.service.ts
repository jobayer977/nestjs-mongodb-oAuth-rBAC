/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from './permission.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class PermissionService extends BaseService<Permission> {
	constructor(
		@InjectModel(Permission.name)
		readonly permissionModel: Model<Permission>
	) {
		super(permissionModel);
	}
}
