import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
	BaseFilterRequestDTO,
	UpdateActiveStatusDTO,
} from 'src/base/base.request';
import { AppHeaders } from 'src/decorators/appHeaders.decorator';
import { CreateUserDTO, UpdateUserDTO } from './requests';
import {
	UserRoleAssignDTO,
	UserRoleRemoveDTO,
} from './requests/user-role-assign';
import { UserService } from './user.service';

@ApiTags('Users')
@AppHeaders()
@Controller('/users')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async findAll(@Query() options: BaseFilterRequestDTO) {
		return this.userService.filterFromBD(options);
	}

	@Post()
	@ApiBody({ type: CreateUserDTO })
	async insert(@Body() reqPayloads: CreateUserDTO): Promise<any> {
		return this.userService.createUser(reqPayloads);
	}

	@Put('/:id')
	@ApiBody({ type: UpdateUserDTO })
	async update(
		@Param('id') id: string,
		@Body() reqPayloads: UpdateUserDTO
	): Promise<any> {
		return this.userService.updateUser(id, reqPayloads);
	}

	@Delete('/:id')
	async delete(@Param('id') id: string): Promise<any> {
		return this.userService.deleteUser(id);
	}

	@Get('/:id')
	async findById(@Param('id') id: string): Promise<any> {
		return this.userService.getUserById(id);
	}

	@Put('/active-status/:id')
	@ApiBody({ type: UpdateActiveStatusDTO })
	async updateStatus(
		@Param('id') id: string,
		@Body() payload: UpdateActiveStatusDTO
	) {
		return this.userService.changeActiveStatus(id, payload);
	}

	@Put('/:id/assign-roles')
	@ApiBody({ type: UserRoleAssignDTO })
	async assignUserRole(
		@Param('id') id: string,
		@Body() payload: UserRoleAssignDTO
	) {
		return this.userService.assignUserRole(id, payload?.roles || []);
	}

	@Put('/:id/remove-roles')
	@ApiBody({ type: UserRoleRemoveDTO })
	async removeUserRole(
		@Param('id') id: string,
		@Body() payload: UserRoleRemoveDTO
	) {
		return this.userService.removeUserRole(id, payload?.roles || []);
	}
}
