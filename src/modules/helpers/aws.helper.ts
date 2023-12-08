import * as AWS from 'aws-sdk';

import { ENV } from 'src/ENV';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AWSHelper {
	private s3: AWS.S3;

	constructor() {
		this.s3 = new AWS.S3({
			endpoint: ENV.DO_SPACES_ENDPOINT,
			accessKeyId: ENV.DO_SPACES_KEY,
			secretAccessKey: ENV.DO_SECRETS_KEY,
			region: 'nyc3',
		});
	}

	async uploadFile(buffer: Buffer, filename: string): Promise<string> {
		const params = {
			Bucket: `domain/${ENV.env}/images`,
			Key: `${new Date().getTime()}-${filename}`,
			Body: buffer,
			ACL: 'public-read',
		};

		const { Location } = await this.s3.upload(params).promise();
		return Location;
	}
}
