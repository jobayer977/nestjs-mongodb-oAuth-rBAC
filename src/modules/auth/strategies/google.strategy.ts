import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { ENV } from 'src/ENV';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor() {
		super({
			clientID: ENV.GOOGLE_CLIENT_ID,
			clientSecret: ENV.GOOGLE_CLIENT_SECRET,
			callbackURL: ENV.GOOGLE_CALLBACK_URL,
			scope: ['email', 'profile'],
		});
	}
	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: VerifyCallback
	): Promise<any> {
		const { id, emails, displayName } = profile;
		const user = {
			googleId: id,
			email: emails[0].value,
			name: displayName,
			picture: profile.photos[0].value,
			provider: profile.provider,
		};
		done(null, user);
	}
}
