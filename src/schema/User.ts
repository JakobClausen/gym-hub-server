import { IsEmail, MinLength } from 'class-validator';
import 'reflect-metadata';
import { AuthorizationRoleTypes } from 'src/types/authTypes';
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

  role: AuthorizationRoleTypes;

  @Field()
  tokenVersion: number;

  @Field(() => Gym)
  gym?: Gym;

  @Field(() => Number)
  gymId: number;
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

  @Field(() => Number)
  gymId: number;
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
