import { Field, ObjectType } from "@nestjs/graphql";
import { FieldError } from "../../../types/field-error.type";

import { User } from "../../users/entities/user.entity";

@ObjectType()
class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

export default LoginResponse;
