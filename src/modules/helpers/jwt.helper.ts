import { Injectable, UnauthorizedException } from '@nestjs/common';
import { decode, sign, verify } from 'jsonwebtoken';

import { ENV } from 'src/ENV';

const JWT_SECRET: string = ENV.jwt.JWT_SECRET;

@Injectable()
export class JWTHelper {
	public async sign(payload: any, options: any) {
		return sign(payload, JWT_SECRET, options);
	}

	public async verify(token: string) {
		try {
			return verify(token, JWT_SECRET);
		} catch (error) {
			throw new UnauthorizedException('Unauthorized Access Detected');
		}
	}

	public extractToken(headers: any) {
		let token: string =
			headers && headers.authorization ? headers.authorization : '';
		token = token.replace(/Bearer\s+/gm, '');
		return token;
	}

	public async makeResetPasswordToken(data: {
		id: string;
		isFirstTime: boolean;
	}) {
		const config = {
			payload: {
				...data,
			},
			options: {
				algorithm: 'HS512',
				expiresIn: ENV.jwt.RESET_PASSWORD_EXPIRES_IN,
			},
		};
		const token = await this.sign(config.payload, config.options);
		const tokenData = decode(token);
		const exp = tokenData.exp;
		return { token, exp };
	}

	public async makeAccessToken(data: any) {
		const configAccess = {
			payload: {
				...data,
			},
			options: {
				algorithm: 'HS512',
				expiresIn: ENV.jwt.EXPIRES_IN,
			},
		};
		const token = await this.sign(configAccess.payload, configAccess.options);
		const tokenData = decode(token);
		const exp = tokenData.exp;
		return { token, exp };
	}

	public async makePermissionToken(data: any) {
		const configAccess = {
			payload: {
				...data,
			},
			options: {
				algorithm: 'HS512',
				expiresIn: ENV.jwt.EXPIRES_IN,
			},
		};
		const token = await this.sign(configAccess.payload, configAccess.options);
		const tokenData = decode(token);
		const exp = tokenData.exp;
		return { token, exp };
	}

	public async makeRefreshToken(data: any) {
		const configAccess = {
			payload: {
				...data,
			},
			options: {
				algorithm: 'HS512',
				expiresIn: ENV.jwt.REFRESH_TOKEN_EXPIRES_IN,
			},
		};
		const token = await this.sign(configAccess.payload, configAccess.options);
		const tokenData = decode(token);
		const exp = tokenData.exp;
		return { token, exp };
	}
}
