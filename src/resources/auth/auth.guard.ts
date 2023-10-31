import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext().req;

    // Check if the user is authenticated by checking req.session
    if (!req.session.userId) {
      return false;
    }

    // Check if the user is authorized by checking req.session.user.role
    // (You would have to define what roles you have in your application)

    return true;
  }
}

// TODO should I add channelId guard?
