import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Put,
	Query,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

import { Post } from '@nestjs/common';
import { CreatePermissionRequestDto } from './requests';
import { PermissionService } from './permission.service';
import {
	BaseFilterRequestDTO,
	UpdateActiveStatusDTO,
} from 'src/base/base.request';
import { FilterPermissionRequestDto } from './requests/filter-permission-request.dto';

/*
https://docs.nestjs.com/controllers#controllers
*/

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
	constructor(private permissionService: PermissionService) {}

	@Post()
	@ApiProperty({
		type: CreatePermissionRequestDto,
	})
	async create(@Body() payload: CreatePermissionRequestDto) {
		return this.permissionService.insertIntoDB(payload);
	}

	@Get('')
	@ApiProperty({
		type: FilterPermissionRequestDto,
	})
	async getAll(@Query() reqQuery: FilterPermissionRequestDto) {
		return this.permissionService.filterFromBD(reqQuery);
	}

	@Put(':id')
	@ApiProperty({
		type: CreatePermissionRequestDto,
	})
	async update(
		@Param('id') id: string,
		@Body() payload: CreatePermissionRequestDto
	) {
		return this.permissionService.updateIntoDB(id, payload);
	}

	@Get(':id')
	async getOne(@Param('id') id: string) {
		return this.permissionService.findById(id);
	}

	@Put(':id/active-status')
	@ApiProperty({
		type: UpdateActiveStatusDTO,
	})
	async changeActiveStatus(
		@Param('id') id: string,
		@Body() payload: UpdateActiveStatusDTO
	) {
		return this.permissionService.changeActiveStatus(id, payload);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.permissionService.deleteFromDB(id);
	}
}
