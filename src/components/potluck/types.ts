import type { Dish, Potluck, User } from "@prisma/client";

export type FullDish = (Dish & {
  attendee: User | null;
});

export type FullPotluck = (Potluck & {
  host: User;
  dishes: FullDish[];
  attendees: User[];
});

