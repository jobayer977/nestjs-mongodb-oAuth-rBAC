/*
https://docs.nestjs.com/modules
*/

import { Image, ImageSchema } from './images/Image.entity';
import { Otp, OtpSchema } from './otp/otp.schema';

import { HelpersModule } from '../helpers';
import { ImagesController } from './images/images.controller';
import { ImagesService } from './images/images.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp/otp.service';

const SERVICES = [OtpService, ImagesService];
@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Otp.name, schema: OtpSchema },
			{
				name: Image.name,
				schema: ImageSchema,
			},
		]),
		HelpersModule,
	],
	controllers: [ImagesController],
	providers: [...SERVICES],
	exports: [...SERVICES],
})
export class CommonModule {}
