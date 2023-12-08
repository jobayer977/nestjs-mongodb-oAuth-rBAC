/*
https://docs.nestjs.com/modules
*/

import { Otp, OtpSchema } from './otp/otp.schema';

import { HelpersModule } from '../helpers';
import { ImagesController } from './images/images.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp/otp.service';

const SERVICES = [OtpService];
@Module({
	imports: [
		MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
		HelpersModule,
	],
	controllers: [ImagesController],
	providers: [...SERVICES],
	exports: [...SERVICES],
})
export class CommonModule {}
