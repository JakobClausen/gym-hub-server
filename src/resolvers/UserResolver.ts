import { CreateUser, User } from "../schema/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../context/prisma";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async user(@Arg("id") id: number, @Ctx() ctx: Context) {
    return ctx.prisma.user.findUnique({ where: { id } });
  }

  @Mutation(() => User)
  async createUser(
    @Arg("newUserInput") userInput: CreateUser,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.user.create({
      data: userInput,
    });
  }
}
