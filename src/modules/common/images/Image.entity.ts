import { BaseEntity, BaseEntitySchema } from 'src/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';
import { IsNotEmpty } from 'class-validator';

@Schema({ timestamps: true })
export class Image extends BaseEntity {
	@Prop({ type: String, required: true, maxlength: 255 })
	link: string;

	@IsNotEmpty()
	@Prop({ type: String, required: true, maxlength: 255 })
	type: string;
}

export const ImageSchema =
	SchemaFactory.createForClass(Image).add(BaseEntitySchema);
