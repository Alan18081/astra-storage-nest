import { createParamDecorator } from '@nestjs/common';

export const ProjectAccount = createParamDecorator((data: any, req: any) => {
    return req.projectAccount;
});