import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

export type Membership = "free" | "individual" | "team" | "enterprise";

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Column({ default: false })
  @Field({ defaultValue: false })
  isGuest: boolean;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ default: "" })
  photoUrl: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string; // could be empty if googleLogin (or appleLogin)

  @Field(() => String)
  @Column({ default: "free" })
  membership: Membership;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  
}
