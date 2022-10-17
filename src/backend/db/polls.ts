import { nanoid } from 'nanoid';
import { prisma } from '@/services/db/prisma';

export const createPoll = (
  header: string,
  answers: string[],
  supportsMultiVote: boolean = false
) => {
  const answersInsertion = answers.map((a) => ({ title: a }));
  const code = nanoid(8);
  return prisma.poll.create({
    data: {
      header,
      code,
      supportsMultiVote,
      answers: { create: answersInsertion },
    },
  });
};

export const fetchPollByCode = (code: string) => {
  return prisma.poll.findFirst({
    where: { code },
    include: { answers: true },
  });
};
