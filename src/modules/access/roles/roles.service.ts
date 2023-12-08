import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { UserRoles } from 'src/enums';
import { FilterRolesRequestDto, UpdateRoleRequestDto } from './requests';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService extends BaseService<Roles> {
	private FoundationalRoles = [
		UserRoles.ADMIN,
		UserRoles.INDIVIDUAL,
		UserRoles.PUBLISHER,
	];
	constructor(
		@InjectModel(Roles.name)
		readonly rolesModel: Model<Roles>
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
