import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from './field-error.type';

@ObjectType()
class BooleanResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Boolean, { nullable: true })
  value?: boolean;
}

export default BooleanResponse;
