import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { MyContext } from "src/types/context.type";
import BooleanResponse from "../../types/boolean-response.input";
import { AuthGuard } from "../auth/auth.guard";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @ResolveField(() => String)
  // initial(@Root() user: User): string {
  //   const initial = user.givenName[0] + user.familyName[0];
  //   return initial;
  // }
  @Query(() => [User], { name: "users" })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  me(@Context() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    // no need to await, why?
    return this.usersService.findOne(req.session.userId);
  }

  @Query(() => User, { name: "user" })
  findOne(@Args("id") id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => BooleanResponse)
  deleteUser(@Context() { req, res }: MyContext) {
    const { userId } = req.session;
    return this.usersService.remove(userId, req, res);
  }
}
