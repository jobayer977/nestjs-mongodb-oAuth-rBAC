import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';

/*
https://docs.nestjs.com/modules
*/

@Module({
	imports: [],
	controllers: [],
	providers: [StripeService],
	exports: [StripeService],
})
export class StripeModule {}
