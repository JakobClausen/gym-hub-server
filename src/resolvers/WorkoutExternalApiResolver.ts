import { UserInputError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { authorizationRoles } from '../constants/auth';
import { Context } from '../context/prisma';
import {
  WorkoutExternalApi,
  WorkoutExternalApiInput,
} from '../schema/WorkoutExternalApi';

@Resolver(WorkoutExternalApi)
export class WorkoutExternalApiResolver {
  @Authorized()
  @Query(() => WorkoutExternalApi)
  async getWorkoutExternalApi(@Ctx() ctx: Context) {
    return await ctx.prisma.workoutExternalApi.findFirst({
      where: { gymId: ctx.payload.user.gymId },
    });
  }

  @Authorized([authorizationRoles.COACH])
  @Mutation(() => WorkoutExternalApi)
  async createWorkoutExternalApi(
    @Arg('workoutExternalApiInput') input: WorkoutExternalApiInput,
    @Ctx() ctx: Context
  ) {
    const { gymId } = ctx.payload.user;
    const workout = await ctx.prisma.workoutExternalApi.findUnique({
      where: { gymId },
    });
    if (workout) {
      throw new UserInputError(`There is already a external wokrout api`);
    }
    return ctx.prisma.workoutExternalApi.create({
      data: {
        ...input,
        gymId,
      },
    });
  }
}
