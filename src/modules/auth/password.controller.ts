/*
https://docs.nestjs.com/controllers#controllers
*/
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
	ChangePasswordDTO,
	ForgotPasswordDTO,
	ForgotPasswordVerifyDTO,
} from './requests';
import { PasswordService } from './password.service';
@Controller('password')
@ApiTags('Password')
export class PasswordController {
	constructor(private readonly passwordService: PasswordService) {}
	@Post('individual/forgot-request')
	@ApiBody({
		type: ForgotPasswordDTO,
		description: 'Forgot Password Individual',
	})
	async individualForgotPasswordRequest(@Body() payload: ForgotPasswordDTO) {
		return this.passwordService.individualForgotPasswordRequest(payload);
	}
	@Post('individual/forgot-verify')
	@ApiBody({
		type: ForgotPasswordVerifyDTO,
		description: 'Forgot Password Individual Verify',
	})
	async individualForgotPasswordVerify(
		@Body() payload: ForgotPasswordVerifyDTO
	) {
		return this.passwordService.individualForgotPasswordVerify(payload);
	}
	@Post('individual/change')
	@ApiBody({
		type: ChangePasswordDTO,
	})
	async individualChangePassword(@Body() payload: ChangePasswordDTO) {
		return this.passwordService.individualChangePassword(payload);
	}
}
