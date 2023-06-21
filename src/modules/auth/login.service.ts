import { LoginDTO, OAuthLoginDTO } from './requests';
import { Provider, UserRoles } from 'src/enums';

import { BcryptHelper } from '../helpers/bcrypt.helper';
import { ENV } from 'src/ENV';
import { Injectable } from '@nestjs/common';
import { JWTHelper } from '../helpers/jwt.helper';
import { Response } from 'express';
import { RolesService } from '../access/roles/roles.service';
import { UserService } from '../users/user.service';

/*
https://docs.nestjs.com/providers#services
*/
@Injectable()
export class LoginService {
	constructor(
		private userService: UserService,
		private readonly jwtHelper: JWTHelper,
		private readonly bcryptHelper: BcryptHelper,
		private rolesService: RolesService
	) {}
	async admin(payload: LoginDTO): Promise<any> {
		try {
			const user = await this.userService.userModel
				.findOne({
					email: payload.email.toLowerCase(),
				})
				.select('+password');
			if (!user) throw new Error('User not found');
			const hasAdminRole = await this.userService.checkUserHasRoles(user.id, [
				UserRoles.ADMIN,
			]);
			if (!hasAdminRole) throw new Error('User not authorized');
			const isPasswordMatch = await this.bcryptHelper.compareHash(
				payload.password,
				user.password
			);
			if (!isPasswordMatch) throw new Error('Password not match');
			const token = await this.jwtHelper.makeAccessToken({
				id: user.id,
				username: user.username,
			});
			return token;
		} catch (error) {
			throw error;
		}
	}
	async individual(payload: LoginDTO): Promise<any> {
		try {
			const user = await this.userService.checkIfUserExist(payload.email);
			if (!user) throw new Error('User not found');

			if (user.provider !== Provider.LOCAL) {
				throw new Error(
					'You are registered with ' +
						user.provider +
						' account, please login with ' +
						user.provider +
						' instead.'
				);
			}

			if (!user.isVerified) throw new Error('User not verified');
			const hasIndividualRole = await this.userService.checkUserHasRoles(
				user.id,
				[UserRoles.INDIVIDUAL, UserRoles.PUBLISHER]
			);
			if (!hasIndividualRole) throw new Error('User not authorized');
			const isPasswordMatch = await this.bcryptHelper.compareHash(
				payload.password,
				user.password
			);
			if (!isPasswordMatch) throw new Error('Password not match');
			const token = await this.jwtHelper.makeAccessToken({
				id: user.id,
				username: user.username,
			});
			return token;
		} catch (error) {
			throw error;
		}
	}
	async oAuthLogin(payload: OAuthLoginDTO, res: Response): Promise<any> {
		const user = await this.userService.checkIfUserExist(payload.email);
		if (!user) {
			const newUser = await this.userService.userModel.create({
				username: await this.userService.generateUsernameFromEmail(
					payload.email
				),
				email: payload.email,
				provider: payload.provider,
				picture: payload.picture,
				isVerified: true,
				firstName: payload?.fullName?.split(' ')[0],
				lastName: payload?.fullName?.split(' ')[1],
			});
			await this.userService.assignUserRole(newUser.id, [UserRoles.INDIVIDUAL]);
			const token = await this.jwtHelper.makeAccessToken({
				id: newUser.id,
				username: newUser.username,
			});
			res.redirect(`${ENV.OAUTH_REDIRECT_URL}?token=${token.token}`);
		}
		if (user) {
			await this.userService.userModel
				.updateOne(
					{ _id: user.id },
					{
						$set: {
							provider: payload.provider,
							email: payload.email,
							picture: payload.picture,
							isVerified: true,
							firstName: payload.fullName?.split(' ')[0],
							lastName: payload.fullName?.split(' ')[1],
						},
					},
					{ upsert: true }
				)
				.exec();
			const token = await this.jwtHelper.makeAccessToken({
				id: user.id,
				username: user.username,
			});
			res.redirect(`${ENV.OAUTH_REDIRECT_URL}?token=${token?.token}`);
		}
	}
}
