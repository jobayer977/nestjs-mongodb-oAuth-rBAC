import { AWSHelper } from './aws.helper';
import { BcryptHelper } from './bcrypt.helper';
import { JWTHelper } from './jwt.helper';
import { LogtoService } from './logto.service';
import { MailerService } from './mailer.service';
import { Module } from '@nestjs/common';

/*
https://docs.nestjs.com/modules
*/

const HELPERS = [
	BcryptHelper,
	JWTHelper,
	MailerService,
	LogtoService,
	AWSHelper,
];

@Module({
	providers: [...HELPERS],
	exports: [...HELPERS],
})
export class HelpersModule {}
