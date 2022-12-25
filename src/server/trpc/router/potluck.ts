import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { potluckCreationSchema, potluckDishSchema } from "../../../utils/validation/potluck-schemas";
import { TRPCError } from "@trpc/server";

export const potluckRouter = router({
  create: protectedProcedure
    .input(potluckCreationSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, description, date, location, hostEmail } = input;

      const dt = new Date(Date.parse(date));
      // const dateTime = formDateTime(date, time);

      const user = await ctx.prisma.user.findFirst({
        where: { email: hostEmail },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const potluck = await ctx.prisma.potluck.create({
        data: {
          name,
          description,
          date: dt,
          location,
          host: {
            connect: {
              id: user.id,
            },
          }
        },
      });

      return {
        status: 201,
        message: "Potluck created successfully",
        result: { potluck },
      };
    }),
  getAllForUser: protectedProcedure
    .input(z.object({
      userId: z.string().optional()
    }))
    .query(async ({ input, ctx }) => {
      const { userId } = input;
      
      if(!userId) throw new TRPCError({ code: "BAD_REQUEST", message: "User ID is required" });

      const potlucks = await ctx.prisma.potluck.findMany({
        where: {
          OR: [
            { hostId: userId },
            { guests: { some: { userId } } }
          ]
        },
        include: {
          host: true,
        } 
      });

      const hosting = potlucks.filter(x => x.hostId === userId);
      const attending = potlucks.filter(x => x.hostId !== userId);

      return {
        status: 200,
        message: "Potlucks retrieved successfully",
        result: { hosting, attending },
      };
    }),
  get: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .query(async ({ input, ctx }) => {
      const potluck = await ctx.prisma.potluck.findFirst({
        where: { id: input.id },
        include: {
          host: true,
          dishes: {
            include: {
              guest: {
                include: {
                  user: true,
                }
              },
            }
          },
          guests: true,
        }        
      });
      
      return {
        status: 200,
        message: "Potluck retrieved successfully",
        result: { potluck },
      }
    }),
  addDish: protectedProcedure
    .input(z.object({
      potluckId: z.string(),
      dish: potluckDishSchema
    }))
    .mutation(async ({ input, ctx }) => {
      const { potluckId, dish } = input;
      const { type, quantity, suggestion } = dish;

      const potluck = await ctx.prisma.potluck.findFirst({
        where: { id: potluckId },
      });

      if (!potluck) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Potluck not found",
        });
      }

      const item = await ctx.prisma.dish.create({
        data: {
          type,
          quantity,
          suggestion,
          potluck: {
            connect: {
              id: potluckId,
            }
          }
        },
      });

      return {
        status: 201,
        message: "Dish added successfully",
        result: { item },
      };
    }),

});
