import { LoginService } from './login.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
@Controller('oAuth')
@ApiTags('oAuth')
export class OAuthController {
	constructor(private loginService: LoginService) {}

	@Get('google')
	@UseGuards(AuthGuard('google'))
	async googleAuth() {}

	@Get('google/callback')
	@UseGuards(AuthGuard('google'))
	async googleAuthRedirect(@Req() req, @Res() res) {
		await this.loginService.oAuthLogin(
			{
				email: req.user.email,
				provider: req.user.provider,
				fullName: req.user.name,
				picture: req.user.picture,
			},
			res
		);
	}

	@Get('facebook')
	@UseGuards(AuthGuard('facebook'))
	async facebookAuth() {}

	@Get('facebook/callback')
	@UseGuards(AuthGuard('facebook'))
	async facebookAuthRedirect(@Req() req, @Res() res) {
		await this.loginService.oAuthLogin(
			{
				email: req.user.email,
				provider: req.user.provider,
				fullName: req.user.name,
				picture: req.user.picture,
			},
			res
		);
	}
}
