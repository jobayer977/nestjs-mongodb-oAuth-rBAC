import * as session from 'express-session';

import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AccessModule } from './modules/access/access.module';
import { AppController } from './app.controller';
import { AppExceptionFilter } from 'src/filter/appException.filter';
import { AppResponseInterceptor } from 'src/interceptors/appResponse.interceptor';
import { AppService } from './app.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { DatabaseModule } from './database/database.module';
import { GlobalSettingsModule } from './modules/common/global-settings/global-settings.module';
import { HelpersModule } from './modules/helpers/helpers.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { StripeWebhookModule } from './modules/stripeWebhook/stripewebhook.module';
import { UserModule } from './modules/users/user.module';

@Module({
	imports: [
		GlobalSettingsModule,
		StripeWebhookModule,
		StripeModule,
		CommonModule,
		UserModule,
		HelpersModule,
		AuthModule,
		DatabaseModule,
		AccessModule,
		StripeWebhookModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: AppExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: AppResponseInterceptor,
		},
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				session({
					secret: 'keyboard cat', // Replace with your secret key
					resave: false,
					saveUninitialized: true,
					cookie: { maxAge: 60000 }, // Adjust cookie options as needed
				})
			)
			.forRoutes('*');

		consumer
			.apply(AuthMiddleware)
			.exclude(
				{
					path: `articles`,
					method: RequestMethod.GET,
				},
				{
					path: `articles/(.*)`,
					method: RequestMethod.GET,
				},
				{
					path: `auth/(.*)`,
					method: RequestMethod.ALL,
				},
				{
					path: `stripe-webhook`,
					method: RequestMethod.ALL,
				},
				{
					path: `stripe-webhook/(.*)`,
					method: RequestMethod.ALL,
				},
				{
					path: `categories`,
					method: RequestMethod.GET,
				},
				{
					path: `categories/(.*)`,
					method: RequestMethod.GET,
				},
				{
					path: `images`,
					method: RequestMethod.ALL,
				},
				{
					path: `images/(.*)`,
					method: RequestMethod.ALL,
				},
				{
					path: `oAuth/(.*)`,
					method: RequestMethod.ALL,
				},
				{
					path: `password/(.*)`,
					method: RequestMethod.ALL,
				}
			)
			.forRoutes('*');
	}
}
