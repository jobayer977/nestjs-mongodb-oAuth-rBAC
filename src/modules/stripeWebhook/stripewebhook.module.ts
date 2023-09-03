/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeEventSchema } from './stripe-event.entity';
import { StripeModule } from '../stripe/stripe.module';
import { StripeWebhookController } from './stripewebhook.controller';
import { StripeWebhookService } from './stripewebhook.service';
import { UserModule } from '../users/user.module';

@Module({
	imports: [
		StripeModule,
		UserModule,
		MongooseModule.forFeature([
			{
				name: 'StripeEvent',
				schema: StripeEventSchema,
			},
		]),
	],
	controllers: [StripeWebhookController],
	providers: [StripeWebhookService],
})
export class StripeWebhookModule {}
