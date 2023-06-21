import { BaseEntity, BaseEntitySchema } from 'src/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Permission extends BaseEntity {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	description: string;
}

export const PermissionSchema =
	SchemaFactory.createForClass(Permission).add(BaseEntitySchema);
