import { AccessModule } from '../access/access.module';
import { CommonModule } from '../common/common.module';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { HelpersModule } from '../helpers';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { Module } from '@nestjs/common';
import { OAuthController } from './oauth.controller';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { UserModule } from '../users/user.module';

@Module({
	imports: [HelpersModule, UserModule, CommonModule, AccessModule],
	controllers: [
		LoginController,
		RegisterController,
		OAuthController,
		PasswordController,
	],
	providers: [
		LoginService,
		RegisterService,
		GoogleStrategy,
		FacebookStrategy,
		PasswordService,
	],
})
export class AuthModule {}
