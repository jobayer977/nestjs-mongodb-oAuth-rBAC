import * as mongooseAutoIncrement from 'mongoose-auto-increment';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({ toJSON: { transform: transformSchema } })
export class BaseEntity extends Document {
	@Prop({ type: 'number', default: 0 })
	priority?: number;

	@Prop({ type: 'boolean', default: true })
	active?: boolean;

	@Prop({ type: 'string', required: false, default: null })
	createdBy?: string;

	@Prop({ type: 'string', required: false, default: null })
	updatedBy?: string;

	@Prop({ type: 'string', default: null })
	deletedBy?: string;

	@Prop({ type: Date, default: Date.now })
	createdAt?: Date;

	@Prop({ type: Date, default: null })
	updatedAt?: Date;

	@Prop({ type: Date, select: false, default: null })
	deletedAt?: Date;
}

function transformSchema(doc, ret, options) {
	ret.id = ret._id;
	delete ret._id;
	delete ret.__v;
	return ret;
}

export const BaseEntitySchema = SchemaFactory.createForClass(BaseEntity);
