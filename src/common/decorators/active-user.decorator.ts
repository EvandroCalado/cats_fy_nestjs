import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: AuthenticatedUser = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
