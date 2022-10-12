import * as trpc from '@trpc/server';
import { z } from 'zod';

export const appRouter = trpc
  .router()
  .query('get-data', {
    input: z.object({
      id: z.string(),
    }),
    resolve({ input }) {
      return 'Hi';
    },
  })
  .mutation('do-thing', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return 'Done';
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
