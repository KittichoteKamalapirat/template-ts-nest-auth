import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GoogleLoginInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  photoUrl?: string;
}
