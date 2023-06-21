import { BaseEntity, BaseEntitySchema } from 'src/base/base.entity';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Permission } from '../permission/permission.entity';

@Schema()
export class Roles extends BaseEntity {
	@Prop({ required: true })
	name: string;

	@Prop({ required: false })
	description: string;

	@Prop({ type: [] })
	permissions: string[];
}

export const RoleSchema =
	SchemaFactory.createForClass(Roles).add(BaseEntitySchema);
