import { UserInputError } from 'apollo-server-express';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { authorizationRoles } from '../constants/auth';
import { Context } from '../context/prisma';
import { AddGymClass, GymClass, UpdateGymClass } from '../schema/GymClass';

@Resolver(GymClass)
export class GymClassResolver {
  @Authorized()
  @Query(() => [GymClass])
  async classes(@Ctx() ctx: Context, @Arg('day') day: number) {
    return ctx.prisma.gymClass.findMany({
      where: { gymId: ctx.payload.user.gymId, dayOfTheWeek: day },
      orderBy: { startTime: 'asc' },
    });
  }

  @Authorized([authorizationRoles.COACH])
  @Mutation(() => GymClass)
  async updateGymClass(
    @Arg('id') id: number,
    @Arg('updateGymClass') input: UpdateGymClass,
    @Ctx() ctx: Context
  ) {
    try {
      return await ctx.prisma.gymClass.update({
        where: {
          id,
        },
        data: {
          ...input,
        },
      });
    } catch (error) {
      throw new UserInputError('Something went wrong!');
    }
  }

  @Authorized([authorizationRoles.COACH])
  @Mutation(() => Boolean)
  async createGymClass(
    @Arg('createGymClass') input: AddGymClass,
    @Ctx() ctx: Context
  ) {
    try {
      await ctx.prisma.gymClass.create({
        data: {
          ...input,
          gymId: ctx.payload?.user.gymId,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  @Authorized([authorizationRoles.COACH])
  @Mutation(() => Boolean)
  async deleteGymClass(@Arg('id') id: number, @Ctx() ctx: Context) {
    try {
      await ctx.prisma.gymClass.delete({ where: { id } });
      return true;
    } catch (error) {
      throw new UserInputError('Unable to delete schedule!');
    }
  }
}
