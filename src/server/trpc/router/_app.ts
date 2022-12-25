import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { potluckRouter } from "./potluck";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  potluck: potluckRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
