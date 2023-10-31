import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { MyContext } from "../../types/context.type";

import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import UserResponse from "../users/dto/user-response";
import { CreateUserInput } from "../users/dto/create-user.input";
import { LoginInput } from "./dto/login.input";
import BooleanResponse from "../../types/boolean-response.input";
import { GoogleLoginInput } from "./dto/googleLogin.input";

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService
  ) {}
  @Mutation(() => UserResponse)
  async guestLogin(@Context() { req }: MyContext): Promise<UserResponse> {
    return this.authService.guestLogin(req);
  }

  @Mutation(() => UserResponse)
  async login(
    @Context() { req }: MyContext,
    @Args("input") input: LoginInput
  ): Promise<UserResponse> {
    return this.authService.login(input, req);
  }

  @Mutation(() => UserResponse)
  async register(
    @Context() { req }: MyContext,
    @Args("input") input: CreateUserInput
  ): Promise<UserResponse> {
    return this.authService.register(input, req);
  }

  @Mutation(() => UserResponse)
  async googleLogIn(
    @Context() { req }: MyContext,
    @Args("input") input: GoogleLoginInput
  ) {
    const userResponse = await this.authService.googleLogIn(input);
    if (userResponse.user) req.session.userId = userResponse.user.id;

    return userResponse;
  }
  @Mutation(() => UserResponse)
  async appleLogIn(
    @Context() { req }: MyContext,
    @Args("token") token: string
  ) {
    const userResponse = await this.authService.appleLogIn(token);
    if (userResponse.user) req.session.userId = userResponse.user.id;
    return userResponse;
  }

  @Mutation(() => BooleanResponse)
  logout(@Context() ctx: MyContext) {
    return this.authService.logout(ctx);
  }
}
