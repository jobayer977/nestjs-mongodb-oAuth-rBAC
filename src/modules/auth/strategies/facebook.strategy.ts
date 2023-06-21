import { Strategy, VerifyCallback } from 'passport-facebook';

import { ENV } from 'src/ENV';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
	constructor() {
		super({
			clientID: ENV.FACEBOOK_APP_ID,
			clientSecret: ENV.FACEBOOK_CLIENT_SECRET,
			callbackURL: ENV.FACEBOOK_CALLBACK_URL,
			profileFields: [
				'emails',
				'displayName',
				'photos',
				'name',
				'id',
				'gender',
			],
			scope: 'email',
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
