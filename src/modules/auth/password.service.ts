import {
	ChangePasswordDTO,
	ForgotPasswordDTO,
	ForgotPasswordVerifyDTO,
} from './requests';
import { Provider, UserRoles } from 'src/enums';

import { BcryptHelper } from '../helpers/bcrypt.helper';
import { Injectable } from '@nestjs/common';
import { JWTHelper } from '../helpers/jwt.helper';
import { MailerService } from './../helpers/mailer.service';
import { OtpService } from '../common/otp/otp.service';
import { RolesService } from './../access/roles/roles.service';
import { UserService } from './../users/user.service';
import { verify } from 'jsonwebtoken';

/*
https://docs.nestjs.com/providers#services
*/
@Injectable()
export class PasswordService {
	constructor(
		private userService: UserService,
		private readonly jwtHelper: JWTHelper,
		private readonly bcryptHelper: BcryptHelper,
		private rolesService: RolesService,
		private readonly otpService: OtpService
	) {}
	async individualForgotPasswordRequest(payload: ForgotPasswordDTO) {
		try {
			const user = await this.userService.userModel.findOne({
				email: payload.email.toLowerCase(),
			});
			if (!user) {
				throw new Error('User not found');
			}
			if (user.provider !== Provider.LOCAL) {
				throw new Error(
					'You are using social login method, We cannot reset your password.'
				);
			}
			const checkUserHasIndividualRole =
				await this.userService.checkUserHasRoles(user.id, [
					UserRoles.INDIVIDUAL,
				]);
			if (!checkUserHasIndividualRole) {
				throw new Error('User not authorized');
			}
			const saveOtp = await this.otpService.createOrUpdateOtp({
				email: user.email,
			});
			await this.otpService.sendIndividualForgotPasswordOTP({
				to: user.email,
				otp: saveOtp.otp,
			});
			return {
				otp: saveOtp.otp,
				email: user.email,
			};
		} catch (error) {
			throw error;
		}
	}
	async individualForgotPasswordVerify(payload: ForgotPasswordVerifyDTO) {
		const { email, otp, password } = payload;
		try {
			const user = await this.userService.userModel.findOne({
				email,
			});
			if (!user) {
				throw new Error('User not found');
			}
			const checkUserHasIndividualRole =
				await this.userService.checkUserHasRoles(user.id, [
					UserRoles.INDIVIDUAL,
				]);
			if (!checkUserHasIndividualRole) {
				throw new Error('User not authorized');
			}
			const otpDoc = await this.otpService.verifyOTP({
				email,
				otp,
			});
			if (!otpDoc) {
				throw new Error('OTP is invalid');
			}
			const hashedPassword = await this.bcryptHelper.hashString(password);
			user.password = hashedPassword;
			await user.save();
			const token = await this.jwtHelper.makeAccessToken({
				id: user.id,
				username: user.username,
			});
			return token;
		} catch (error) {
			throw error;
		}
	}
	async individualChangePassword(payload: ChangePasswordDTO) {
		try {
			const { email, oldPassword, newPassword } = payload;
			const user = await this.userService.userModel
				.findOne({
					email,
				})
				.select('+password')
				.populate('roles');
			if (!user) {
				throw new Error('User not found');
			}
			const checkUserHasIndividualRole =
				await this.userService.checkUserHasRoles(user.id, [
					UserRoles.INDIVIDUAL,
				]);
			if (!checkUserHasIndividualRole) {
				throw new Error('User not authorized');
			}
			const isPasswordMatch = await this.bcryptHelper.compareHash(
				oldPassword,
				user.password
			);
			if (!isPasswordMatch) {
				throw new Error('Invalid old password');
			}
			const hashedPassword = await this.bcryptHelper.hashString(newPassword);
			user.password = hashedPassword;
			await user.save();
			const token = await this.jwtHelper.makeAccessToken({
				id: user.id,
				username: user.username,
			});
			return token;
		} catch (error) {
			throw error;
		}
	}
}
