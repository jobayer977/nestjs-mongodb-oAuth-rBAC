import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AppHeaders } from 'src/decorators/appHeaders.decorator';
import {
	IndividualRegisterDTO,
	RegisterDTO,
	ResendOTPDTO,
	VerifyDTO,
} from './requests';
import { RegisterService } from './register.service';

@ApiTags('Auth Register')
@AppHeaders()
@Controller('/auth/register')
export class RegisterController {
	constructor(private registerService: RegisterService) {}

	@Post('admin')
	@ApiBody({ type: RegisterDTO })
	async admin(@Body() registerDto: RegisterDTO): Promise<any> {
		return this.registerService.admin(registerDto);
	}

	@Post('individual')
	@ApiBody({ type: IndividualRegisterDTO })
	async individual(@Body() registerDto: IndividualRegisterDTO): Promise<any> {
		return this.registerService.individual(registerDto);
	}

	@Post('individual/verify')
	@ApiBody({ type: VerifyDTO })
	async individualVerify(@Body() payload: VerifyDTO): Promise<any> {
		return this.registerService.individualVerify(payload);
	}

	@Post('individual/resend-otp')
	@ApiBody({ type: ResendOTPDTO })
	async individualResendOTP(@Body() payload: ResendOTPDTO): Promise<any> {
		return this.registerService.individualResendOTP(payload);
	}
}
