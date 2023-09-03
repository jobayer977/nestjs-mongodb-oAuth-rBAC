import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailerService {
	constructor() {}
	async sendMail(to: string, subject: string, content: string) {
		const resend = new Resend('re_e9ChxgiF_9t8pTorsQexxujhYNVktAagR');
		const res = await resend.emails.send({
			from: 'team@journalocity.com',
			to: to,
			subject: subject,
			html: content,
		});
		return res;
	}

	async inviteUserToPublication({ to, inviteLink, publicationName }) {
		return await this.sendMail(
			to,
			`Invitation to join ${publicationName} on Journalocity`,
			`<div>
				<p>Hi,</p>
				<p>You have been invited to join a publication on Journalocity. Please click the link below to accept the invitation.</p>
				<p><a href="${inviteLink}">Accept Invitation</a></p>
				<p>Thanks,</p>
				<p>Journalocity Team</p>
			</div>`
		);
	}
}
