import { signUpSchema } from "../../../utils/validation/auth-schemas";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from '../../db/client';
import { TRPCError } from "@trpc/server";
import { hash } from "argon2";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password, name } = input;

      const exists = await prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const hashedPassword = await hash(password);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name
        },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: user.email,
      };
    }),  
});
