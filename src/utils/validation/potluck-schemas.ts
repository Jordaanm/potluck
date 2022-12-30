import * as z from "zod";

export const potluckCreationSchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  hostEmail: z.string(),
});

export const potluckDishSchema = z.object({
  type: z.string(),
  quantity: z.number(),
  suggestion: z.string(),
  attendeeId: z.string().optional()
});

export const potluckSchema = potluckCreationSchema.extend({
  dishes: z.array(potluckDishSchema)  
});

export type IPotluckCreate = z.infer<typeof potluckCreationSchema>;
export type IPotluck = z.infer<typeof potluckSchema>;
export type IDish = z.infer<typeof potluckDishSchema>;