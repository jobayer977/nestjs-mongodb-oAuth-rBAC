import { Module, forwardRef } from '@nestjs/common';
import { User, UserSchema } from './user.schema';

import { AccessModule } from '../access/access.module';
import { HelpersModule } from '../helpers';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';

/*
https://docs.nestjs.com/modules
*/

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		HelpersModule,
		AccessModule,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
