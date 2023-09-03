import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ENV } from 'src/ENV';
import { UserService } from '../users/user.service';
import { StripeService } from './../stripe/stripe.service';
import { StripeEvent } from './stripe-event.entity';
/*
https://docs.nestjs.com/providers#services
*/
@Injectable()
export class StripeWebhookService {
	constructor(
		private stripeService: StripeService,
		private userService: UserService,
		@InjectModel(StripeEvent.name) readonly stripeEventModel: Model<StripeEvent>
	) {}
	async checkIfStripeEventExists(eventId: string) {
		try {
			const stripeEvent = await this.stripeEventModel.findOne({
				eventId,
			});
			if (stripeEvent) {
				throw new BadRequestException(
					`This event with ${eventId} already exists in ${ENV.env} database`
				);
			}
			return await this.stripeEventModel.create({
				eventId,
			});
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
	async processStripeWebhookEvent(event: any) {
		await this.checkIfStripeEventExists(event.id);
		if (event.type === 'checkout.session.completed') {
			return await this.handleCheckoutSessionCompleted(event);
		}
	}
	private async handleCheckoutSessionCompleted(event: any) {
		try {
			const session = event.data.object;
			const customer = await this.stripeService.getCustomer(
				session.customer as string
			);
			if (!customer) {
				throw new Error(
					`Customer not found with id ${session.customer} in stripe`
				);
			}
			const customerUser = await this.userService.getUserByStripeCustomerId(
				customer.id
			);
			if (!customerUser) {
				throw new Error(
					`User not found with stripeCustomerId ${customer.id} in database`
				);
			}
			// TODO: Do something with your payment
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}
