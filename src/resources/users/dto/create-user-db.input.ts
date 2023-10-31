import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDbInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  email: string;

  @Field()
  isGuest: boolean;

  @Field()
  password: string;
}
