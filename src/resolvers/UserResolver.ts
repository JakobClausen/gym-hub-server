import { User } from "../schema/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "../context/prisma";

@InputType()
class CreateUser {
  @Field()
  name: string;

  @Field()
  email: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(@Ctx() ctx: Context) {
    return ctx.prisma.user.findMany();
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
