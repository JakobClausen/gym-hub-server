import { UserInputError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../context/prisma';
import { Workout, WorkoutInput } from '../schema/Workout';
import { externalWorkoutApi } from '../service/externalWorkoutApi';

@Resolver(Workout)
export class WorkoutResolver {
  @Query(() => Workout)
  async getWorkoutByDay(
    @Arg('day') day: number,
    @Arg('type') type: string,
    @Ctx() ctx: Context
  ) {
    const externalApi = await ctx.prisma.workoutExternalApi.findUnique({
      where: { gymId: ctx.payload.user.gymId },
    });

    const workouts = await externalWorkoutApi(externalApi);
    if (workouts) return workouts;

    return await ctx.prisma.workout.findFirst({
      where: { dayOfTheWeek: day, type, gymId: ctx.payload.user.gymId },
      select: {
        type: true,
        workoutSection: {
          orderBy: {
            order: 'asc',
          },
          select: {
            title: true,
            body: true,
            order: true,
          },
        },
      },
    });
  }

  @Mutation(() => Workout)
  async createWorkout(
    @Arg('workoutIntput') input: WorkoutInput,
    @Ctx() ctx: Context
  ) {
    const { dayOfTheWeek, type } = input;
    const { gymId } = ctx.payload.user;
    const workout = await ctx.prisma.workout.findFirst({
      where: { dayOfTheWeek, type, gymId },
    });
    if (workout) {
      throw new UserInputError(`There is already a workout for ${type}`);
    }
    return ctx.prisma.workout.create({
      data: {
        ...input,
        gymId,
      },
    });
  }
}
