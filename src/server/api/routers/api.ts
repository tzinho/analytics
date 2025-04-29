import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const apiRouter = createTRPCRouter({
  checkStatus: publicProcedure.query(async () => {
    return { message: "Hello World!" };
  }),
});
