import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  photoUrl?: string;
}
