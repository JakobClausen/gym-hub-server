import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { GymClass } from './GymClass';
import { User } from './User';
import { Workout } from './Workout';
import { WorkoutExternalApi } from './WorkoutExternalApi';

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

  @Field(() => String)
  logoUrl: String;

  @Field(() => [User])
  user: User[];

  @Field(() => [GymClass])
  gymClass: GymClass[];

  @Field(() => [Workout])
  workout: Workout[];

  @Field(() => WorkoutExternalApi)
  workoutExternalApi: WorkoutExternalApi;
}

@InputType()
export class RegisterGym {
  @Field()
  name: string;
}
