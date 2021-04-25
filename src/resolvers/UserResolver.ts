import { Login, Register, User } from "../schema/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../context/prisma";
import bcrypt from "bcrypt";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async user(@Arg("id") id: number, @Ctx() ctx: Context) {
    return ctx.prisma.user.findUnique({ where: { id } });
  }

  @Mutation(() => User)
  async registerUser(
    @Arg("registerUser") registerInput: Register,
    @Ctx() ctx: Context
  ) {
    const hash = await bcrypt.hash(registerInput.password, 10);
    return ctx.prisma.user.create({
      data: {
        ...registerInput,
        password: hash,
      },
    });
  }

  @Mutation(() => User)
  async loginUser(@Arg("loginInput") loginInput: Login, @Ctx() ctx: Context) {
    const { email, password } = loginInput;
    const user = await ctx.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("No user with this email!");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password is invalid!");
    }

    return user;
  }
}
