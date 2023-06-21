import { BaseFilterRequestDTO } from 'src/base/base.request';
import { createParamDecorator } from '@nestjs/common';

export const RequestOptions = createParamDecorator(
	(data, req): BaseFilterRequestDTO => {
		return req.args[0].reqOptions;
	}
);
