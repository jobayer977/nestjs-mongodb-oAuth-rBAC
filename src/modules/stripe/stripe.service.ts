import { BadRequestException, Injectable } from '@nestjs/common';

import { ENV } from 'src/ENV';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
	private stripe: Stripe;
	constructor() {
		this.stripe = new Stripe(ENV.STRIPE_SECRET_KEY, {
			apiVersion: '2022-11-15',
		});
	}

	public async constructEventFromPayload(signature: string, payload: Buffer) {
		try {
			const webhookSecret = ENV.STRIPE_WEBHOOK_SECRET;
			return this.stripe.webhooks.constructEvent(
				payload,
				signature,
				webhookSecret
			);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	public async createCustomer({ name, email }) {
		return this.stripe.customers.create({
			name,
			email,
		});
	}
	public async createCheckoutSession(
		payload: Stripe.Checkout.SessionCreateParams
	) {
		return await this.stripe.checkout.sessions.create(payload);
	}

	public async getCheckoutSession(sessionId: string) {
		return this.stripe.checkout.sessions.retrieve(sessionId);
	}

	async getCustomer(customerId: string) {
		return this.stripe.customers.retrieve(customerId);
	}
}
