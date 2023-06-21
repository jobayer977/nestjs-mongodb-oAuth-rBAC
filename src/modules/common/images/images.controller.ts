/*
https://docs.nestjs.com/controllers#controllers
*/

import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AppHeaders } from 'src/decorators/appHeaders.decorator';
import {
	Controller,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as express from 'express';
import { AWSHelper } from 'src/modules/helpers/aws.helper';
import { ImagesService } from './images.service';

@ApiTags('Images')
@AppHeaders()
@Controller('images')
export class ImagesController {
	constructor(private service: ImagesService, private awsHelper: AWSHelper) {}

	@Post('cdn/upload')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(FileInterceptor('file'))
	async upload(@UploadedFile() file: any) {
		const buffer = file.buffer;
		const filename = file.originalname;
		const imageUrl = await this.awsHelper.uploadFile(buffer, filename);
		return { imageUrl };
	}

	@Post('editor/upload')
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				image: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@UseInterceptors(FileInterceptor('image'))
	async uploadEditor(@UploadedFile() file: any) {
		const buffer = file.buffer;
		const filename = file.originalname;
		const imageUrl = await this.awsHelper.uploadFile(buffer, filename);
		return {
			success: 1,
			file: {
				url: imageUrl,
			},
		};
	}
}
