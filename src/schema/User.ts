import { IsEmail, MinLength } from 'class-validator';
import 'reflect-metadata';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Gym } from './Gym';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  password: string;

  @Field()
  tokenVersion: number;

  @Field(() => Gym)
  gym?: Gym;

  @Field(() => Number)
  gymId?: number;
}

@InputType()
export class Register {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

@InputType()
export class Login {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}
