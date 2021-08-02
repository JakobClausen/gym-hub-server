import { Max, Min } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Gym } from './Gym';
import { WorkoutSection } from './WorkoutSection';

@ObjectType()
export class Workout {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  type: string;

  @Field(() => Number)
  dayOfTheWeek: number;

  @Field(() => Number)
  gymId: number;

  @Field(() => Gym)
  gym: Gym;

  @Field(() => [WorkoutSection], { nullable: true })
  workoutSection?: WorkoutSection[];
}

@InputType()
export class WorkoutInput {
  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => Number)
  @Min(0)
  @Max(6)
  dayOfTheWeek: number;
}
