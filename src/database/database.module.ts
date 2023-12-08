/*
https://docs.nestjs.com/modules
*/

import * as mongoose from 'mongoose';

import { ENV } from 'src/ENV';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forRoot(ENV.MONGO_URI, {})],
})
export class DatabaseModule {}
