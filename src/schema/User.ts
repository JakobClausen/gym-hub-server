import "reflect-metadata";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { IsEmail } from "class-validator";

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class CreateUser {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
