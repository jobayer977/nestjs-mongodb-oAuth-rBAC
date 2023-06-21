import {
	IsEmail,
	IsIn,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/enums';

export class CreateUserDTO {
	@ApiProperty({
		description: 'User Full Name',
		required: true,
		type: String,
		maxLength: 255,
		example: 'Jon Doe',
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	username: string;

	@ApiProperty({ type: 'string', example: '123456' })
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({ type: 'string', example: '123456' })
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({ type: 'string', example: '123456' })
	@IsNotEmpty()
	phone: string;

	@ApiProperty({
		description: 'User Email',
		required: true,
		type: String,
		maxLength: 255,
		example: 'jon@gmail.com',
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	@IsEmail()
	email: string;

	@ApiProperty({ type: 'string', example: '123456' })
	address: string;

	@ApiProperty({ type: 'string', example: '123456' })
	facebook: string;

	@ApiProperty({ type: 'string', example: '123456' })
	linkedin: string;

	@ApiProperty({ type: 'string', example: '123456' })
	twitter: string;

	@ApiProperty({ type: 'string', example: '123456' })
	picture: string;

	@ApiProperty({ type: 'string', example: '123456' })
	password: string;

	@ApiProperty({
		description: 'User bio',
		required: false,
		type: String,
	})
	bio?: string;
}

export class UpdateUserDTO {
	@ApiProperty({ type: 'string', example: '123456' })
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({ type: 'string', example: '123456' })
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({ type: 'string', example: '123456' })
	@IsNotEmpty()
	phone: string;

	@ApiProperty({ type: 'string', example: '123456' })
	address: string;

	@ApiProperty({ type: 'string', example: '123456' })
	facebook: string;

	@ApiProperty({ type: 'string', example: '123456' })
	linkedin: string;

	@ApiProperty({ type: 'string', example: '123456' })
	twitter: string;

	@ApiProperty({ type: 'string', example: '123456' })
	picture: string;

	@ApiProperty({
		description: 'User bio',
		required: false,
		type: String,
	})
	bio?: string;
}
