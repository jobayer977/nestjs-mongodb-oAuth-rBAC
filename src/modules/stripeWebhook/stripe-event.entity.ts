import { BaseEntity, BaseEntitySchema } from 'src/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class StripeEvent extends BaseEntity {
	@Prop({ default: null })
	eventId: string;
}

export const StripeEventSchema =
	SchemaFactory.createForClass(StripeEvent).add(BaseEntitySchema);
