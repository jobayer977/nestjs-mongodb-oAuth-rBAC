import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ENV } from './ENV';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

console.log(ENV);

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix(ENV.api.API_PREFIX);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({
		origin: '*',
	});
	const options = new DocumentBuilder()
		.setTitle(ENV.api.API_TITLE)
		.setDescription(ENV.api.API_DESC)
		.setVersion(ENV.api.API_VERSION)
		.setBasePath(ENV.api.API_PREFIX)
		.setExternalDoc('Postman Collection', '/docs-json')
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'authorization'
		)
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('docs', app, document);
	await app.listen(ENV.port);
	console.log(ENV);
	console.log('Auth Service is ready to serve on port:', ENV.port);
}
bootstrap();
