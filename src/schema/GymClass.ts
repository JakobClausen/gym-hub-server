import { Matches, Max, Min } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { Gym } from './Gym';

@ObjectType()
export class GymClass {
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

  @Field(() => String)
  startTime: string;

  @Field(() => String)
  endTime: string;

  @Field(() => Gym)
  gym: Gym;

  @Field(() => Number)
  gymId: number;
}

@InputType()
export class AddGymClass {
  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => Number)
  @Min(0)
  @Max(6)
  dayOfTheWeek: number;

  @Field(() => String)
  @Matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
  startTime: string;

  @Field(() => String)
  @Matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
  endTime: string;
}

@InputType()
export class UpdateGymClass {
  @Field(() => String, { nullable: true })
  type?: string;

  @Field(() => String, { nullable: true })
  @Matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
  startTime?: string;

  @Field(() => String, { nullable: true })
  @Matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
  endTime?: string;
}
