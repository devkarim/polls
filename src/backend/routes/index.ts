import {
  fetchPollByCode,
  voteAnswer,
  checkIfIPVotedBefore,
} from './../db/polls';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { createPoll } from '../db/polls';
import { nanoid } from 'nanoid';

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const { req } = opts;
  // console.log('Headers', req.headers);
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
      header: z.string().min(2, 'Header must be at least 2 characters long.'),
      answers: z.string().array().min(2, 'Poll must have at least 2 answers.'),
      author: z.string().optional().nullable(),
    }),
    async resolve({ input }) {
      const { header, answers, author } = input;
      const poll = await createPoll(header, answers, author);
      return { success: true, poll };
    },
  })
  .mutation('vote-poll', {
    input: z.object({
      id: z.string(),
      pollId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { id, pollId } = input;
      const { ipAddress } = ctx;
      // console.log('IP Address:', ipAddress);
      const hasIPVotedBefore = await checkIfIPVotedBefore(pollId, ipAddress);
      if (hasIPVotedBefore)
        // TODO: throw TRPCClientError instead
        return {
          success: false,
          message: 'Your IP address has voted for this poll before.',
        };
      const answer = await voteAnswer(id, pollId, ipAddress);
      return { success: true, answer };
    },
  });

export type AppRouter = typeof appRouter;
