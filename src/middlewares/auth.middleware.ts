import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from '@nestjs/common';

import { JWTHelper } from 'src/modules/helpers/jwt.helper';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly jwtHelper: JWTHelper) {}
	async use(req: any, res: Response, next: Function) {
		console.log('Request...', req.originalUrl);
		const token = this.jwtHelper.extractToken(req.headers);
		const verifiedUser: any = await this.jwtHelper.verify(token);
		if (!verifiedUser) {
			throw new UnauthorizedException('Unauthorized Access Detected');
		}
		req.user = verifiedUser;
		console.log('Request...', req.user);
		next();
	}
}
