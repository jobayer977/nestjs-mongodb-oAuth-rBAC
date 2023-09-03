import { IsEmpty, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class BaseFilterRequestDTO {
	@ApiProperty({
		required: false,
	})
	@IsOptional()
	searchTerm?: string;

	@ApiProperty({ example: 1, required: false })
	page?: number;

	@ApiProperty({ example: 10, required: false })
	take?: number;

	@IsOptional()
	@ApiProperty({
		example: true,
		description: 'Active or inactive',
		required: false,
	})
	active?: boolean;

	@ApiProperty({
		example: [],
		description: 'Relations',
		required: false,
	})
	relations?: string[];
}

export class BaseFindOneByCriteriaRequestDTO {
	@ApiProperty({
		example: [],
		description: 'Relations',
		required: false,
	})
	relations?: string[];
}

export class UpdateActiveStatusDTO {
	@ApiProperty({
		example: true,
		description: 'Active or inactive',
		required: false,
	})
	active: boolean;
}
