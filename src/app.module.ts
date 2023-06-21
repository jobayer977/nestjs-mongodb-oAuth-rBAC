import * as session from 'express-session';

import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AccessModule } from './modules/access/access.module';
import { AppController } from './app.controller';
import { AppExceptionFilter } from 'src/filter/appException.filter';
import { AppResponseInterceptor } from 'src/interceptors/appResponse.interceptor';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { DatabaseModule } from './database/database.module';
import { HelpersModule } from './modules/helpers/helpers.module';
import { UserModule } from './modules/users/user.module';

@Module({
	imports: [
		CommonModule,
		UserModule,
		HelpersModule,
		AuthModule,
		DatabaseModule,
		AccessModule,
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
	}
}
