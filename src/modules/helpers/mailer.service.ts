import { ENV } from 'src/ENV';
import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailerService {
	constructor() {}
	async sendMail(to: string, subject: string, content: string) {
		const resend = new Resend(ENV.RESEND_API_KEY);
		const res = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: to,
			subject: subject,
			html: content,
		});
		return res;
	}

	async inviteUserToPublication({ to, inviteLink, publicationName }) {
		return await this.sendMail(
			to,
			`Invitation to join ${publicationName} on domain`,
			`<div>
				<p>Hi,</p>
				<p>You have been invited to join a publication on domain. Please click the link below to accept the invitation.</p>
				<p><a href="${inviteLink}">Accept Invitation</a></p>
				<p>Thanks,</p>
				<p>domain Team</p>
			</div>`
		);
	}
}
