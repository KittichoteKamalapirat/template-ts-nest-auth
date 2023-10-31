import { Field, ObjectType } from '@nestjs/graphql';
import { FieldError } from './field-error.type';

@ObjectType()
class StringResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => String, { nullable: true })
  value?: string;
}

export default StringResponse;
