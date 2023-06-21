import { BaseEntity, BaseEntitySchema } from 'src/base/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Otp extends BaseEntity {
	@Prop({ required: true, unique: false })
	otp: string;

	@Prop({ required: true, unique: false })
	email: string;

	@Prop({ required: true, unique: false })
	expiryDate: Date;

	@Prop({ required: true, unique: false })
	isExpired: boolean;
}

export const OtpSchema =
	SchemaFactory.createForClass(Otp).add(BaseEntitySchema);

OtpSchema.pre<Otp>('save', function (next) {
	this.isExpired = Date.now() > new Date(this.expiryDate).getTime();
	next();
});

OtpSchema.pre<Otp>('find', function (next) {
	this.isExpired = Date.now() > new Date(this.expiryDate).getTime();
	next();
});

OtpSchema.pre<Otp>('findOne', function (next) {
	this.isExpired = Date.now() > new Date(this.expiryDate).getTime();
	next();
});
