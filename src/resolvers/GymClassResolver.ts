import { UserInputError } from 'apollo-server-express';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Context } from '../context/prisma';
import { isAuth } from '../middleware/isAuth';
import { AddGymClass, GymClass, UpdateGymClass } from '../schema/GymClass';

@Resolver(GymClass)
export class GymClassResolver {
  @Query(() => [GymClass])
  @UseMiddleware(isAuth)
  async classes(@Ctx() ctx: Context, @Arg('day') day: number) {
    return ctx.prisma.gymClass.findMany({
      where: { gymId: ctx.payload.user.gymId, dayOfTheWeek: day },
      orderBy: { startTime: 'asc' },
    });
  }

  @Mutation(() => GymClass)
  @UseMiddleware(isAuth)
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
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

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteGymClass(@Arg('id') id: number, @Ctx() ctx: Context) {
    try {
      await ctx.prisma.gymClass.delete({ where: { id } });
      return true;
    } catch (error) {
      throw new UserInputError('Unable to delete schedule!');
    }
  }
}
