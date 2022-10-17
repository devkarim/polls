import { fetchPollByCode } from './../db/polls';
import * as trpc from '@trpc/server';
import { z } from 'zod';
import { createPoll } from '../db/polls';

export const appRouter = trpc
  .router()
  .query('get-poll', {
    input: z.object({
      code: z.string(),
    }),
    resolve({ input }) {
      const { code } = input;
      return fetchPollByCode(code);
    },
  })
  .mutation('make-poll', {
    input: z.object({
      header: z.string(),
      answers: z.string().array(),
    }),
    async resolve({ input }) {
      const { header, answers } = input;
      return createPoll(header, answers);
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
