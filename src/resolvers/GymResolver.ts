import { UserInputError } from 'apollo-server-express';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../context/prisma';
import { Gym, RegisterGym } from '../schema/Gym';

@Resolver(Gym)
export class GymResolver {
  @Query(() => Gym)
  async getGym(@Ctx() ctx: Context) {
    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.payload?.user.id },
    });
    if (!user?.gymId) {
      throw new UserInputError('No user with this email!');
    }
    return ctx.prisma.gym.findUnique({
      where: { id: user?.gymId },
    });
  }

  @Mutation(() => Gym)
  async registerGym(
    @Arg('registerGym') registerInput: RegisterGym,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.gym.create({
      data: {
        ...registerInput,
      },
    });
  }
}
