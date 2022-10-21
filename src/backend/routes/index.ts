import { fetchPollByCode, voteAnswer } from './../db/polls';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { createPoll } from '../db/polls';

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const { req } = opts;
  console.log('Headers', req.headers);
  const forwarded = req.headers['x-forwarded-for'] as string | undefined;
  const ipAddress = forwarded
    ? forwarded.split(/, /)[0]
    : (req.socket.remoteAddress as string);
  return {
    ipAddress,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export function createRouter() {
  return trpc.router<Context>();
}

export const appRouter = createRouter()
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
  })
  .mutation('vote-poll', {
    input: z.object({
      id: z.string(),
      pollId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { id, pollId } = input;
      console.log('IP Address:', ctx.ipAddress);
      return voteAnswer(id, pollId, ctx.ipAddress);
    },
  });

export type AppRouter = typeof appRouter;
