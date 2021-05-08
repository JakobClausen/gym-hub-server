import { Login, Register, User } from "../schema/User";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "../context/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

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

  @Mutation(() => LoginResponse)
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

    ctx.res.cookie(
      "rid",
      sign({ email: user.email }, process.env.REFRESH_SECRET!, {
        expiresIn: "7d",
      }),
      {
        httpOnly: true,
      }
    );

    return {
      accessToken: sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "15m",
      }),
    };
  }
}
