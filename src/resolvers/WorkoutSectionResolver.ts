import { UserInputError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { authorizationRoles } from '../constants/auth';
import { Context } from '../context/prisma';
import { WorkoutSection, WorkoutSectionInput } from '../schema/WorkoutSection';

@Resolver(WorkoutSection)
export class WorkoutSectionResolver {
  @Authorized()
  @Query(() => WorkoutSection)
  async getWorkoutSection(@Arg('id') id: number, @Ctx() ctx: Context) {
    return await ctx.prisma.workoutSection.findUnique({
      where: { id },
    });
  }
  @Authorized([authorizationRoles.ADMIN])
  @Mutation(() => WorkoutSection)
  async createWorkoutSection(
    @Arg('workoutSectionIntput') input: WorkoutSectionInput,
    @Ctx() ctx: Context
  ) {
    const workoutSections = await ctx.prisma.workoutSection.findMany({
      where: { workoutId: input.workoutId },
    });
    if (workoutSections.length >= 3) {
      throw new UserInputError(
        `You can only have three workout sections per workout`
      );
    }
    return ctx.prisma.workoutSection.create({
      data: {
        ...input,
      },
    });
  }
}
