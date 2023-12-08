import { BaseEntity, BaseEntitySchema } from 'src/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Roles extends BaseEntity {
	@Prop({ required: true })
	name: string;

	@Prop({ required: false })
	description: string;
}

export const RoleSchema =
	SchemaFactory.createForClass(Roles).add(BaseEntitySchema);
