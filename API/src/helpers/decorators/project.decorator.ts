import { createParamDecorator } from '@nestjs/common';

export const Project = createParamDecorator((data: any, req: any) => {
   return req.project;
});