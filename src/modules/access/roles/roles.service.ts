import { UserService } from './../../users/user.service';
import { PermissionService } from './../permission/permission.service';
/*
https://docs.nestjs.com/providers#services
*/

import { BaseService } from 'src/base/base.service';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Roles } from './roles.entity';
import { InjectModel } from '@nestjs/mongoose';
import {
	AssignPermissionDTO,
	FilterRolesRequestDto,
	UpdateRoleRequestDto,
} from './requests';
import { UserRoles } from 'src/enums';

@Injectable()
export class RolesService extends BaseService<Roles> {
	private FoundationalRoles = [
		UserRoles.ADMIN,
		UserRoles.INDIVIDUAL,
		UserRoles.PUBLISHER,
	];
	constructor(
		@InjectModel(Roles.name)
		readonly rolesModel: Model<Roles>,
		private permissionService: PermissionService
	) {
		super(rolesModel);
	}

	async filter(reqQuery: FilterRolesRequestDto) {
		const roles = await this.rolesModel
			.find({})
			.populate(['permissions'])
			.exec();
		return roles;
	}

	async assignPermission(roleId: string, payload: AssignPermissionDTO) {
		try {
			const role = await this.rolesModel.findById(roleId);
			if (!role) throw new Error('Role not found');
			const permission: any =
				await this.permissionService.permissionModel.findOne({
					name: payload?.permission,
				});
			if (!permission) {
				throw new Error('Permission not found');
			}
			const isPermissionAssigned = role.permissions.find(
				(permission) => permission === payload.permission
			);
			if (isPermissionAssigned) {
				throw new Error('Permission already assigned');
			}
			role.permissions.push(permission.name);
			role.save();
			const response = await this.rolesModel.findById(roleId);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async unassignPermission(roleId: string, payload: AssignPermissionDTO) {
		try {
			const role = await this.rolesModel.findById(roleId);
			if (!role) throw new Error('Role not found');
			const permission: any =
				await this.permissionService.permissionModel.findOne({
					name: payload?.permission,
				});
			if (!permission) {
				throw new Error('Permission not found');
			}
			const isPermissionAssigned = role.permissions.find(
				(permission) => permission === payload.permission
			);
			if (!isPermissionAssigned) {
				throw new Error('Permission not assigned');
			}
			role.permissions = role.permissions.filter(
				(permission) => permission !== payload.permission
			);
			role.save();
			const response = await this.rolesModel.findById(roleId);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async deleteRole(roleId: string) {
		try {
			const role = await this.rolesModel.findById(roleId);
			if (!role) throw new Error('Role not found');
			if (this.FoundationalRoles.includes(role.name as UserRoles)) {
				throw new Error('Cannot delete foundational roles');
			}
			await this.rolesModel.findByIdAndDelete(roleId);
			return { message: 'Role deleted successfully' };
		} catch (error) {
			throw error;
		}
	}

	async updateRole(roleId: string, payload: UpdateRoleRequestDto) {
		try {
			const role = await this.rolesModel.findById(roleId);
			if (!role) throw new Error('Role not found');
			if (this.FoundationalRoles.includes(role.name as UserRoles)) {
				throw new Error('Cannot update foundational roles');
			}
			role.name = payload.name;
			role.description = payload.description;
			await role.save();
			return role;
		} catch (error) {
			throw error;
		}
	}
}
