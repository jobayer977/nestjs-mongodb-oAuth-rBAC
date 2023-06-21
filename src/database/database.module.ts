/*
https://docs.nestjs.com/modules
*/

import * as mongoose from 'mongoose';

import { ENV } from 'src/ENV';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		MongooseModule.forRoot(ENV.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}),
		// MongooseModule.forRoot('mongodb://root:root_pass@mongo:27017', {
		// 	useNewUrlParser: true,
		// 	useUnifiedTopology: true,
		// }),
	],
})
export class DatabaseModule {}
