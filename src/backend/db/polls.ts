import { checkOneHashInHashes, hashString } from './../../helpers/hash';
import { nanoid } from 'nanoid';
import { prisma } from '@/services/db/prisma';

export const createPoll = (
  header: string,
  answers: string[],
  supportsMultiVote: boolean = false
) => {
  const answersInsertion = answers.map((a) => ({ title: a }));
  const code = nanoid(11);
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

export const voteAnswer = async (
  id: string,
  pollId: string,
  ipAddress: string
) => {
  const poll = await prisma.poll.findFirst({ where: { id: pollId } });
  if (!poll) return;
  const hasIpVotedBefore = await checkOneHashInHashes(
    ipAddress,
    poll.ipAddresses
  );
  if (hasIpVotedBefore)
    return {
      success: false,
      message: 'IP address has voted before for this poll.',
    };
  const hashedIpAddress = await hashString(ipAddress);
  await prisma.poll.update({
    where: { id: pollId },
    data: { ipAddresses: { push: hashedIpAddress } },
  });
  const answer = await prisma.answer.update({
    where: { id },
    data: { votes: { increment: 1 } },
  });
  return { success: true, answer };
};
