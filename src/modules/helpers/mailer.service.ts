import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailerService {
	constructor() {}
	async sendMail(to: string, subject: string, content: string) {
		try {
			const transporter = nodemailer.createTransport({
				host: 'smtp-relay.sendinblue.com',
				port: 587,
				auth: {
					user: 'jobayerhossain977@gmail.com', // generated ethereal user
					pass: 'xsmtpsib-c5377a70d4f823ecfe1e5f78e1f98b2f937adf999a1288f21fb77f6c4e78e918-mX3ftITk1nGCFEyR', // generated ethereal password
				},
				secure: false, // true for 465, false for other ports
			});
			// setup email data with unicode symbols
			const mailOptions = {
				from: '"Journalocity" <journalocity@gmail.com>',
				to: to,
				subject: subject,
				text: content,
			};
			// send mail with defined transport object
			const myPromise = new Promise((resolve, reject) => {
				transporter.sendMail(mailOptions, (error: any) => {
					if (error) {
						reject(error);
					}
					resolve(200);
				});
			});
			return myPromise;
		} catch (error) {
			return error;
		}
	}
}
