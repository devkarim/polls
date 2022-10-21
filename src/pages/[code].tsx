import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from '../components/ui/Loading';
import VoteCard from '../features/polls/components/VoteCard';
import { trpc } from '../services/api/trpc';

const HomePage: NextPage = () => {
  const router = useRouter();
  const { code } = router.query as { code: string };
  const { data, isLoading } = trpc.useQuery(['get-poll', { code }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const voteMutation = trpc.useMutation(['vote-poll']);
  const [chosenAnsId, setChosenAnswerId] = useState<string | null>(null);

  if (isLoading) return <Loading />;

  if (!data)
    return (
      <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
        <h2>404 - Poll Not Found</h2>
      </div>
    );

  const onAnswerChange = (ansId: string) => {
    setChosenAnswerId(ansId);
  };

  const vote = async () => {
    if (!chosenAnsId) return;
    const { id: pollId } = data;
    const res = await voteMutation.mutateAsync({ id: chosenAnsId, pollId });
    console.log(res);
  };

  return (
    <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
      <VoteCard poll={data} onAnswerChange={onAnswerChange} onVote={vote} />
    </div>
  );
};

export default HomePage;
