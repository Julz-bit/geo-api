import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Auth = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        user.id = user.sub;
        return user;
    }
)