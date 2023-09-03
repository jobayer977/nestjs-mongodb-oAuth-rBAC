import { StripeService } from './../stripe/stripe.service';
import { BcryptHelper } from './../helpers/bcrypt.helper';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRoles, UserType } from 'src/enums';
import { RolesService } from '../access/roles/roles.service';
import { CreateUserDTO } from './requests';
import { User } from './user.schema';
import { BaseService } from 'src/base/base.service';
import { asyncForEach } from 'src/utils/conversation.util';
import { ENV } from 'src/ENV';
@Injectable()
export class UserService extends BaseService<User> {
	constructor(
		@InjectModel(User.name) readonly userModel: Model<User>,
		private bcryptHelper: BcryptHelper,
		private rolesService: RolesService,
		private stripeService: StripeService
	) {
		super(userModel);
	}
	async checkIfUserExist(email: string): Promise<User> {
		const user = await this.userModel
			.findOne({ email })
			.select('+password')
			.exec();
		return user;
	}
	async createUser(user: Partial<CreateUserDTO>): Promise<User> {
		try {
			const isUserExist = await this.checkIfUserExist(user.email);
			if (isUserExist) {
				throw new Error('User already exist');
			}
			user.password = await this.bcryptHelper.hashString(user.password);
			const createStripeCustomer = await this.stripeService.createCustomer({
				email: user.email,
				name: user.firstName + ' ' + user.lastName,
			});
			user['stripeCustomerId'] = createStripeCustomer.id;
			const createdUser = await this.userModel.create(user);
			await this.assignUserRole(createdUser.id, [UserRoles.INDIVIDUAL]);
			const response = await this.userModel
				.findOne({
					_id: createdUser.id,
				})
				.populate('roles')
				.exec();
			return response;
		} catch (error) {
			throw error;
		}
	}
	async getAllUsers(): Promise<User[]> {
		return this.userModel.find().exec();
	}
	async getUserById(id: string): Promise<User> {
		return this.userModel.findById(id).exec();
	}
	async updateUser(id: string, reqPayload: Partial<User>): Promise<User> {
		try {
			const user = await this.userModel.findOne({ _id: id }).exec();
			if (!user) {
				throw new NotFoundException('User not found');
			}
			await this.userModel.updateOne({ _id: id }, reqPayload).exec();
			const res = await this.userModel.findById(id).exec();
			return res;
		} catch (error) {
			throw error;
		}
	}
	async deleteUser(id: string): Promise<unknown> {
		return await this.userModel.findByIdAndDelete(id).exec();
	}
	async assignUserRole(id: string, payload: string[]): Promise<User> {
		const user = await this.userModel
			.findOne({ _id: id })
			.populate('roles')
			.exec();
		if (!user) {
			throw new NotFoundException('User not found');
		}
		if (payload.length === 0) {
			throw new NotFoundException('Roles are required');
		}
		const rolesData = await this.rolesService.rolesModel.find({
			name: { $in: payload },
		});
		if (rolesData.length === 0) {
			throw new NotFoundException('No Roles found');
		}
		const payloadRoles = [...new Set(rolesData.map((role) => role.name))];
		const roles = [...new Set([...user.roles, ...payloadRoles])];
		await this.userModel
			.updateOne({ _id: id }, { $set: { roles: roles } })
			.exec();
		return this.userModel.findById(id).exec();
	}
	async removeUserRole(id: string, payload: string[]): Promise<User> {
		try {
			const user = await this.userModel
				.findOne({ _id: id })
				.populate('roles')
				.exec();
			if (!user) {
				throw new NotFoundException('User not found');
			}
			if (payload.length === 0) {
				throw new NotFoundException('Roles are required');
			}
			const rolesData = await this.rolesService.rolesModel.find({
				name: { $in: payload },
			});
			if (rolesData.length === 0) {
				throw new NotFoundException('No Roles found');
			}
			const payloadRoles = [...new Set(rolesData.map((role) => role.name))];
			const roles = user.roles.filter((role) => !payloadRoles.includes(role));
			await this.userModel
				.updateOne({ _id: id }, { $set: { roles: roles } })
				.exec();
			return this.userModel.findById(id).exec();
		} catch (error) {
			throw error;
		}
	}
	async generateUsernameFromEmail(email: string): Promise<string> {
		const username = email.split('@')[0]; // Extract the username part from the email
		const existingUser = await this.userModel.findOne({ username }).exec();
		if (existingUser) {
			const usernameCount = await this.userModel
				.countDocuments({
					username: { $regex: `^${username}[0-9]*$`, $options: 'i' },
				})
				.exec();
			return `${username}${usernameCount + 1}`;
		}
		return username;
	}
	async checkUserHasRoles(userId: string, roles: string[]) {
		try {
			const user = await this.userModel
				.findOne({
					_id: userId,
				})
				.populate('roles')
				.exec();
			if (!user) {
				throw new Error('User not found');
			}
			const hasRoles = user.roles.some((role) => roles.includes(role));
			return hasRoles;
		} catch (error) {
			throw error;
		}
	}

	async getUserByStripeCustomerId(stripeCustomerId: string) {
		const user = await this.userModel
			.findOne({
				stripeCustomerId,
			})
			.exec();
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}

	async getSuperAdmin() {
		const user = await this.userModel.findById(ENV.SUPER_ADMIN_ID);
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}
}
