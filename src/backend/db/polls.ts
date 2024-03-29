import { checkOneHashInHashes, hashString } from './../../helpers/hash';
import { nanoid } from 'nanoid';
import { prisma } from '@/services/db/prisma';

export const createPoll = (
  header: string,
  answers: string[],
  author?: string | null,
  supportsMultiVote: boolean = false
) => {
  const answersInsertion = answers.map((a) => ({ title: a }));
  const authorUUID = nanoid();
  const code = nanoid(11);
  return prisma.poll.create({
    data: {
      author: author ?? authorUUID,
      header,
      code,
      supportsMultiVote,
      answers: { create: answersInsertion },
    },
  });
};

export const getPollById = (id: string) => {
  return prisma.poll.findFirst({
    where: { id },
  });
};

export const fetchPollByCode = (code: string) => {
  return prisma.poll.findFirst({
    where: { code },
    include: { answers: true },
  });
};

export const checkIfIPVotedBefore = async (
  pollId: string,
  ipAddress: string
) => {
  const poll = await prisma.poll.findFirst({ where: { id: pollId } });
  if (!poll) return;
  return checkOneHashInHashes(ipAddress, poll.ipAddresses);
};

export const voteAnswer = async (
  id: string,
  pollId: string,
  ipAddress: string
) => {
  const hashedIpAddress = await hashString(ipAddress);
  await prisma.poll.update({
    where: { id: pollId },
    data: { ipAddresses: { push: hashedIpAddress } },
  });
  return prisma.answer.update({
    where: { id },
    data: { votes: { increment: 1 } },
  });
};

export const closeVote = async (id: string) => {
  await prisma.poll.update({
    where: { id },
    data: { status: 'CLOSED' },
  });
  return true;
};

export const openVote = async (id: string) => {
  await prisma.poll.update({
    where: { id },
    data: { status: 'OPEN' },
  });
  return true;
};

export const toggleVote = async (id: string, author: string) => {
  const poll = await prisma.poll.findFirst({
    where: { id },
  });
  if (!poll) return false;
  if (poll.author != author) return false;
  if (poll.status == 'OPEN') {
    await closeVote(id);
  } else {
    await openVote(id);
  }
  return true;
};
