import {
	IndividualRegisterDTO,
	RegisterDTO,
	ResendOTPDTO,
	VerifyDTO,
} from './requests';

import { Injectable } from '@nestjs/common';
import { JWTHelper } from '../helpers/jwt.helper';
import { MailerService } from './../helpers/mailer.service';
import { OtpService } from './../common/otp/otp.service';
import { UserRoles } from 'src/enums';
import { UserService } from '../users/user.service';

/*
https://docs.nestjs.com/providers#services
*/
@Injectable()
export class RegisterService {
	constructor(
		private userService: UserService,
		private readonly jwtHelper: JWTHelper,
		private readonly otpService: OtpService,
		private mailerService: MailerService
	) {}
	async admin(payload: RegisterDTO): Promise<any> {
		try {
			const user = await this.userService.checkIfUserExist(payload.email);
			if (user) throw new Error('User already exist');
			const newUser = await this.userService.createUser({
				email: payload.email,
				password: payload.password,
				username: payload.username,
			});
			await this.userService.assignUserRole(newUser.id, [UserRoles.ADMIN]);
			const token = await this.jwtHelper.makeAccessToken({
				id: newUser.id,
			});
			return token;
		} catch (error) {
			throw error;
		}
	}
	async individual(payload: IndividualRegisterDTO): Promise<any> {
		const session = await this.userService.userModel.db.startSession();
		session.startTransaction();
		try {
			const user = await this.userService.userModel.findOne({
				email: payload.email?.toLowerCase(),
			});
			if (user) {
				if (user.isVerified) {
					throw new Error('User already exists');
				}
				const userEmail = user.email?.toLowerCase();
				const saveOtp = await this.otpService.createOrUpdateOtp({
					email: userEmail,
				});
				const otpRes = await this.otpService.sendOTPToEmail({
					to: userEmail,
					otp: saveOtp.otp,
				});
				console.log({
					otpRes,
				});
				return { otp: saveOtp.otp, email: userEmail };
			}
			const newUser = await this.userService.createUser(payload);
			await this.userService.assignUserRole(newUser.id, [UserRoles.INDIVIDUAL]);
			const saveOtp = await this.otpService.createOrUpdateOtp({
				email: newUser.email,
			});
			const res = await this.otpService.sendOTPToEmail({
				to: newUser.email,
				otp: saveOtp.otp,
			});
			await session.commitTransaction();
			return {
				otp: saveOtp.otp,
				email: newUser.email,
			};
		} catch (error) {
			await session.abortTransaction();
			throw new Error(error.message);
		} finally {
			session.endSession(); // Always end the session when done
		}
	}

	async individualVerify(payload: VerifyDTO): Promise<any> {
		try {
			const user = await this.userService.checkIfUserExist(payload.email);
			if (!user) throw new Error('User not found');
			const otpDoc = await this.otpService.verifyOTP({
				email: user.email,
				otp: payload.otp,
			});
			if (!otpDoc) throw new Error('Invalid OTP');
			const token = await this.jwtHelper.makeAccessToken({
				id: user.id,
				username: user.username,
			});
			await this.otpService.disposeOtp({ email: user.email });
			await this.userService.updateUser(user.id, {
				isVerified: true,
			});
			return token;
		} catch (error) {
			throw error;
		}
	}
	async individualResendOTP(payload: ResendOTPDTO): Promise<any> {
		try {
			const user = await this.userService.checkIfUserExist(payload.email);
			if (!user) throw new Error('User not found');
			const saveOtp = await this.otpService.createOrUpdateOtp({
				email: user.email,
			});
			await this.otpService.sendOTPToEmail({
				to: user.email,
				otp: saveOtp.otp,
			});
			const res = {
				otp: saveOtp.otp,
				email: user.email,
			};
			return res;
		} catch (error) {
			throw error;
		}
	}
}
