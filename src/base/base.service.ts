import {
	BaseFilterRequestDTO,
	BaseFindOneByCriteriaRequestDTO,
	UpdateActiveStatusDTO,
} from './base.request';
import { Document, FilterQuery, Model } from 'mongoose';
import {
	isBooleanString,
	paginationOptions,
	toBool,
} from 'src/utils/conversation.util';

import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseService<T extends Document> {
	protected constructor(private readonly model: Model<T>) {}
	async filterFromBD(options: BaseFilterRequestDTO & Partial<T>): Promise<any> {
		try {
			const schemesProperties = this.model.schema.obj
				? Object.keys(this.model.schema.obj)
				: [];
			const { take, skip } = paginationOptions(options);
			const regex = new RegExp(options.searchTerm, 'i');
			const _filterQuery = {};
			if (options.searchTerm) {
				const notApplicableFields = [
					'priority',
					'active',
					'createdBy',
					'updatedBy',
					'deletedBy',
					'createdAt',
					'updatedAt',
					'deletedAt',
					'isVerified',
				];
				const normalizedSearchFields = schemesProperties.filter((field) => {
					return !notApplicableFields.includes(field);
				});
				const searchQuery = normalizedSearchFields.map((field) => {
					return {
						[field]: regex,
					};
				});
				_filterQuery['$or'] = searchQuery;
			}
			if (isBooleanString(options.active)) {
				_filterQuery['active'] = toBool(options.active);
			}
			const matchedOptionsWithSchemaProperties = Object.keys(options).filter(
				(option) => {
					return schemesProperties.includes(option);
				}
			);
			matchedOptionsWithSchemaProperties.forEach((option) => {
				_filterQuery[option] = options[option];
			});
			const query = this.model.find(_filterQuery).skip(skip).limit(take);
			if (options?.relations?.length > 0) {
				query.populate(options.relations);
			}
			const countQuery = this.model.countDocuments();
			const res = Promise.all([query.exec(), countQuery.exec()]).then(
				([data, total]) => {
					return {
						data,
						total,
						take,
						skip,
						page: Number(options.page),
					};
				}
			);
			return res;
		} catch (error) {
			throw error;
		}
	}

	async findOneByCriteria(
		criteria: BaseFindOneByCriteriaRequestDTO & Partial<T>
	): Promise<T> {
		try {
			const _criteria = {
				...criteria,
			};
			delete _criteria?.relations;
			const query = this.model.findOne(_criteria as any);
			if (criteria?.relations?.length > 0) {
				query.populate(criteria.relations);
			}
			return await query.exec();
		} catch (error) {
			throw error;
		}
	}

	async findById(id: string): Promise<T> {
		try {
			return this.model.findById(id).exec();
		} catch (error) {
			throw error;
		}
	}
	async insertIntoDB(createDto: Partial<T>): Promise<any> {
		try {
			const createdModel = new this.model(createDto);
			return createdModel.save();
		} catch (error) {
			throw error;
		}
	}
	async updateIntoDB(id: string, updateDto: Partial<T>): Promise<T> {
		try {
			return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
		} catch (error) {
			throw error;
		}
	}
	async deleteFromDB(id: string): Promise<any> {
		try {
			return this.model.findByIdAndDelete(id).exec();
		} catch (error) {
			throw error;
		}
	}
	async changeActiveStatus(
		id: string,
		payload: UpdateActiveStatusDTO
	): Promise<T> {
		try {
			await this.model.findByIdAndUpdate(id, payload, { new: true }).exec();
			return await this.model.findById(id).exec();
		} catch (error) {
			throw error;
		}
	}
}
