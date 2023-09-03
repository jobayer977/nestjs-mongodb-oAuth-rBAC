import { BaseEntity, BaseEntitySchema } from 'src/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class GlobalSettings extends BaseEntity {
	@Prop({ required: true, default: 0 })
	commission: number;
}

export const GlobalSettingsSchema =
	SchemaFactory.createForClass(GlobalSettings).add(BaseEntitySchema);

GlobalSettingsSchema.pre('save', async function (next) {
	next();
});
