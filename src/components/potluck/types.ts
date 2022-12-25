import type { Guest, Dish, Potluck, User } from "@prisma/client";

export type FullDish = (Dish & {
  guest: Guest & {
      user: User;
  };
});

export type FullPotluck = (Potluck & {
  host: User;
  guests: Guest[];
  dishes: FullDish[];
});