import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class GymClass {
  @Field(() => ID)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => String)
  name: string;

  @Field(() => Number)
  dayOfTheWeek: number;

  @Field(() => String)
  startTime: string;

  @Field(() => String)
  endTiem: string;
}
