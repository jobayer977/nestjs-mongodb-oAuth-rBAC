import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
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
	@IsString()
	@MaxLength(255)
	@MinLength(6)
	password: string;
}
export class RegisterDTO {
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
	@IsString()
	@MaxLength(255)
	@MinLength(6)
	password: string;
}

export class IndividualRegisterDTO {
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

	@ApiProperty({
		description: 'User Full Name',
		required: true,
		type: String,
		maxLength: 255,
	})
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@ApiProperty({
		description: 'User Full Name',
		required: true,
		type: String,
		maxLength: 255,
	})
	@IsNotEmpty()
	lastName: string;

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
	@IsString()
	@MaxLength(255)
	@MinLength(6)
	password: string;
}

export class VerifyDTO {
	@ApiProperty({
		description: 'User Email',
		required: true,
		type: String,
		maxLength: 255,
		example: '',
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	@IsEmail()
	email: string;

	@ApiProperty({ type: 'string', example: '123456' })
	@IsString()
	@MaxLength(255)
	otp: string;
}

export class ResendOTPDTO {
	@ApiProperty({
		description: 'User Email',
		required: true,
		type: String,
		maxLength: 255,
		example: '',
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	@IsEmail()
	email: string;
}

export class OAuthLoginDTO {
	@ApiProperty({
		description: 'User Email',
		required: true,
		type: String,
		maxLength: 255,
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	@IsEmail()
	email: string;

	@ApiProperty({ type: 'string', example: '123456' })
	@IsString()
	@MaxLength(255)
	@MinLength(6)
	fullName: string;

	@ApiProperty({ type: 'string', example: '123456' })
	@IsString()
	@MaxLength(255)
	@MinLength(6)
	provider: string;

	@ApiProperty({ type: 'string', example: '123456' })
	@IsString()
	picture: string;
}

export class ForgotPasswordDTO {
	@ApiProperty({
		description: 'User Email',
		required: true,
		type: String,
		maxLength: 255,
		example: 'jon@m.com',
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	@IsEmail()
	email: string;
}
export class ForgotPasswordVerifyDTO {
	@ApiProperty({
		description: 'User Email',
		required: true,
		type: String,
		maxLength: 255,
		example: 'jon@m.com',
	})
	@IsNotEmpty()
	@IsString()
	@MaxLength(255)
	@IsEmail()
	email: string;

	@ApiProperty({ type: 'string', example: '123456' })
	password: string;

	@ApiProperty({ type: 'string', example: '123456' })
	otp: string;
}

export class ChangePasswordDTO {
	@ApiProperty({ description: 'User email', example: 'user@example.com' })
	email: string;

	@ApiProperty({ description: 'Old password', example: 'oldPassword123' })
	oldPassword: string;

	@ApiProperty({ description: 'New password', example: 'newPassword456' })
	newPassword: string;
}
