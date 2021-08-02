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
import { AddGymClass, GymClass } from '../schema/GymClass';

@Resolver(GymClass)
export class GymClassResolver {
  @Query(() => [GymClass])
  @UseMiddleware(isAuth)
  async classes(
    @Ctx() ctx: Context,
    @Arg('day', { nullable: true }) day?: number
  ) {
    return ctx.prisma.gymClass.findMany({
      where: { gymId: ctx.payload.gymId, dayOfTheWeek: day },
      orderBy: { startTime: 'asc' },
    });
  }

  @Mutation(() => GymClass)
  @UseMiddleware(isAuth)
  async createGymClass(
    @Arg('createGymClass') input: AddGymClass,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.gymClass.create({
      data: {
        ...input,
        gymId: ctx.payload?.gymId,
      },
    });
  }
}
