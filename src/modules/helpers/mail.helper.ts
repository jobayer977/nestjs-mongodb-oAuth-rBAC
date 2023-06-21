import * as nodemailer from 'nodemailer';

import axios from 'axios';

export class MailHelper {
	sendEmail = async () => {
		try {
			const apiKey = 'YOUR_API_KEY';
			const emailEndpoint = 'https://api.brevo.com/v3/smtp/email';

			const data = {
				sender: {
					name: 'Sender Alex',
					email: 'senderalex@example.com',
				},
				to: [
					{
						email: 'testmail@example.com',
						name: 'John Doe',
					},
				],
				subject: 'Hello world',
				htmlContent:
					'<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>',
			};

			const response = await axios.post(emailEndpoint, data, {
				headers: {
					Accept: 'application/json',
					'Api-Key': apiKey,
					'Content-Type': 'application/json',
				},
			});

			console.log('Email sent successfully:', response.data);
		} catch (error) {
			console.error('Error sending email:', error.response.data);
		}
	};
}
