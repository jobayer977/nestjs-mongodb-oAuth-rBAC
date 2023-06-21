import { MailerService } from './../../helpers/mailer.service';
/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from './otp.schema';
import { Model } from 'mongoose';
import { ENV } from 'src/ENV';
@Injectable()
export class OtpService {
	constructor(
		@InjectModel(Otp.name) private model: Model<Otp>,
		private mailerService: MailerService
	) {}
	async createOrUpdateOtp({ email }) {
		try {
			const otpDoc = await this.model.findOne({ email }).exec();
			const expiryDate = new Date(
				new Date().getTime() + Number(ENV.OTP_EXPIRE_TIME_IN_MINUTES) * 60000
			);
			const newOtp = await this.generateOTP();
			if (otpDoc) {
				otpDoc.otp = String(newOtp);
				otpDoc.expiryDate = expiryDate;
				otpDoc.isExpired = false;
				await otpDoc.save();
				return otpDoc;
			}
			const res = await this.model.create({
				email,
				otp: newOtp,
				expiryDate,
				isExpired: false,
			});
			return res;
		} catch (error) {
			throw error;
		}
	}
	async generateOTP() {
		const digits = '0123456789';
		let otp = '';
		let length = 4;
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * digits.length);
			otp += digits.charAt(randomIndex);
		}
		return otp;
	}
	async sendOTPToEmail({ to, otp }) {
		try {
			const subject = `Your One-Time Password ${otp} for Account Verification`;
			const content = `
				<h2>Your One-Time Password (OTP) for Account Verification</h2>
				<h3>OTP: ${otp}</h3>
			`;
			const res = await this.mailerService.sendMail(to, subject, content);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async sendIndividualForgotPasswordOTP({ to, otp }) {
		try {
			const subject = `Your One-Time Password ${otp} for Forgot Password`;
			const content = `
				<h2>Your One-Time Password (OTP) for Forgot Password</h2>
				<h3>OTP: ${otp}</h3>
			`;
			const res = await this.mailerService.sendMail(to, subject, content);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async verifyOTP({ email, otp }) {
		try {
			const otpDoc = await this.model.findOne({ email }).exec();
			if (!otpDoc) throw new Error('OTP not found');
			if (otpDoc.isExpired) throw new Error('OTP expired');
			if (otpDoc.otp !== otp) throw new Error('OTP not matched');
			return otpDoc;
		} catch (error) {
			throw error;
		}
	}
	async disposeOtp({ email }) {
		try {
			const otpDoc = await this.model.findOne({ email }).exec();
			if (!otpDoc) throw new Error('OTP not found');
			otpDoc.isExpired = true;
			await otpDoc.save();
			return otpDoc;
		} catch (error) {
			throw error;
		}
	}
}
