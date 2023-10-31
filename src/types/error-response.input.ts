import { Field, ObjectType } from "@nestjs/graphql";
import { FieldError } from "./field-error.type";

@ObjectType()
class ErrorResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

export default ErrorResponse;
