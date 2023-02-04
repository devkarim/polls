import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import Copyright from '../../components/Copyright';
import Button from '../../components/ui/Button';
import Loading from '../../components/ui/Loading';
import SimpleCard from '../../components/ui/SimpleCard';
import Space from '../../components/ui/Space';
import TextLink from '../../components/ui/TextLink';
import AnswerCard from '../../features/polls/components/AnswerCard';
import { trpc } from '../../services/api/trpc';

const PollResultsPage: NextPage = () => {
  const router = useRouter();
  const { code } = router.query as { code: string };
  const { data: poll, isLoading } = trpc.useQuery(['get-poll', { code }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const totalVotes = useMemo(
    () => poll?.answers.reduce((a, c) => a + c.votes, 0) || 0,
    [poll]
  );

  if (isLoading) return <Loading />;

  if (!poll)
    return (
      <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
        <h2>404 - Poll Not Found</h2>
      </div>
    );

  return (
    <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
      <p className="text-4xl md:text-5xl">Results</p>
      <Space size="3xl" />
      <SimpleCard className="p-6 max-h-[75%] w-full max-w-xl overflow-auto">
        {poll.answers.map((a) => (
          <AnswerCard key={a.id} answer={a} totalVotes={totalVotes} />
        ))}
      </SimpleCard>
      <Space size="xl" />
      <Button
        variant="outline"
        className="text-lg md:text-xl"
        onClick={() => router.push(`/${poll.code}`)}
      >
        Back to Poll
      </Button>
      <Copyright className="pt-20" />
    </div>
  );
};

export default PollResultsPage;
