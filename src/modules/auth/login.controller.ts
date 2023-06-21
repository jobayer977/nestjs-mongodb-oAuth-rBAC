/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AppHeaders } from 'src/decorators/appHeaders.decorator';
import { LoginDTO } from './requests';
import { LoginService } from './login.service';

@ApiTags('Auth Login')
@AppHeaders()
@Controller('/auth/login')
export class LoginController {
	constructor(private readonly loginService: LoginService) {}

	@Post('admin')
	@ApiBody({ type: LoginDTO })
	async admin(@Body() loginDto: LoginDTO): Promise<any> {
		return this.loginService.admin(loginDto);
	}

	@Post('individual')
	@ApiBody({ type: LoginDTO })
	async individual(@Body() loginDto: LoginDTO): Promise<any> {
		return this.loginService.individual(loginDto);
	}
}
