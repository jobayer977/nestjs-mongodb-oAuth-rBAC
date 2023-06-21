import { AWSHelper } from './aws.helper';
import { BcryptHelper } from './bcrypt.helper';
import { JWTHelper } from './jwt.helper';
import { MailerService } from './mailer.service';
import { Module } from '@nestjs/common';

/*
https://docs.nestjs.com/modules
*/

const HELPERS = [BcryptHelper, JWTHelper, MailerService, AWSHelper];

@Module({
	providers: [...HELPERS],
	exports: [...HELPERS],
})
export class HelpersModule {}
