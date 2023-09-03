import { StripeWebhookService } from './stripewebhook.service';
/*
https://docs.nestjs.com/controllers#controllers
*/
import {
	BadRequestException,
	Controller,
	Headers,
	Post,
	Req,
} from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('stripe-webhook')
@ApiTags('Stripe-webhook')
export class StripeWebhookController {
	constructor(
		private stripeService: StripeService,
		private stripeWebhookService: StripeWebhookService
	) {}

	@Post()
	async handleIncomingEvents(
		@Headers('stripe-signature') signature: string,
		@Req() request: any
	) {
		if (!signature) {
			throw new BadRequestException('Missing stripe-signature header');
		}
		const event = await this.stripeService.constructEventFromPayload(
			signature,
			request.rawBody
		);
		console.log({ type: event.type });
		return await this.stripeWebhookService.processStripeWebhookEvent(event);
	}
}
