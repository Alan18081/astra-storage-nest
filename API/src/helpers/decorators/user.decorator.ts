import {createParamDecorator} from '@nestjs/common';

export const ReqUser = createParamDecorator((data: any, req: any) => {
  return req.user;
});