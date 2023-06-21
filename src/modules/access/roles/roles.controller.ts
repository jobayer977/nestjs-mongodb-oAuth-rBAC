/*
https://docs.nestjs.com/controllers#controllers
*/
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UpdateActiveStatusDTO } from 'src/base/base.request';
import {
	AssignPermissionDTO,
	CreateRoleRequestDto,
	FilterRolesRequestDto,
} from './requests';
import { RolesService } from './roles.service';
@Controller('roles')
@ApiTags('Roles')
export class RolesController {
	constructor(private readonly service: RolesService) {}
	@Post()
	@ApiProperty({
		type: CreateRoleRequestDto,
	})
	async create(@Body() payload: CreateRoleRequestDto) {
		return this.service.insertIntoDB(payload);
	}
	@Get('')
	@ApiProperty({
		type: FilterRolesRequestDto,
	})
	async getAll(@Query() reqQuery: FilterRolesRequestDto) {
		return this.service.filterFromBD({
			...reqQuery,
			relations: ['permissions'],
		});
	}
	@Put(':id')
	@ApiProperty({
		type: CreateRoleRequestDto,
	})
	async update(@Param('id') id: string, @Body() payload: CreateRoleRequestDto) {
		return this.service.updateRole(id, payload);
	}
	@Get(':id')
	async getOne(@Param('id') id: string) {
		return this.service.findById(id);
	}
	@Put(':id/active-status')
	@ApiProperty({
		type: UpdateActiveStatusDTO,
	})
	async changeActiveStatus(
		@Param('id') id: string,
		@Body() payload: UpdateActiveStatusDTO
	) {
		return this.service.changeActiveStatus(id, payload);
	}
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.service.deleteRole(id);
	}
	@Put(':roleId/assign-permission')
	@ApiProperty({
		type: AssignPermissionDTO,
	})
	async assignPermission(
		@Param('roleId') roleId: string,
		@Body() payload: AssignPermissionDTO
	) {
		return this.service.assignPermission(roleId, payload);
	}

	@Put(':roleId/unassign-permission')
	@ApiProperty({
		type: AssignPermissionDTO,
	})
	async unassignPermission(
		@Param('roleId') roleId: string,
		@Body() payload: AssignPermissionDTO
	) {
		return this.service.unassignPermission(roleId, payload);
	}
}
