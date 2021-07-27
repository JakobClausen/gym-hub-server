import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Gym {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  name: String;

  @Field(() => User)
  user: User[];
}

@InputType()
export class RegisterGym {
  @Field()
  name: string;
}
