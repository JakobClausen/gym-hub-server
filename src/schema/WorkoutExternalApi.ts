import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Gym } from './Gym';

@ObjectType()
export class WorkoutExternalApi {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  token: string;

  @Field(() => String)
  endpoint: string;

  @Field(() => String)
  type: string;

  @Field(() => Number)
  gymId: number;

  @Field(() => Gym)
  gym: Gym;
}

@InputType()
export class WorkoutExternalApiInput {
  @Field(() => String)
  token: string;

  @Field(() => String)
  endpoint: string;

  @Field(() => String)
  type: string;
}
