import { Max, Min } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Workout } from './Workout';

@ObjectType()
export class WorkoutSection {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => Number)
  order: number;

  @Field(() => Number)
  workoutId: number;

  @Field(() => Workout)
  workout: Workout;
}

@InputType()
export class WorkoutSectionInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => Number)
  @Min(1)
  @Max(3)
  order: number;

  @Field(() => Number)
  workoutId: number;
}
