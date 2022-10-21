import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from '../components/ui/Loading';
import VoteCard from '../features/polls/components/VoteCard';
import useInfo from '../helpers/hooks/useInfo';
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
  const { msg, color, setError, setInfo, resetAll } = useInfo();

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
    resetAll();
    if (!chosenAnsId) return setError('Please choose an answer to vote for.');
    const { id: pollId } = data;
    const res = await voteMutation.mutateAsync({ id: chosenAnsId, pollId });
    if (!res) return setError('Unable to vote, unexpected error.');
    if (res.success) {
      // TODO: navigate to results page
      setInfo('Voted!');
    } else {
      setError(res.message || 'Unable to vote, unexpected error.');
    }
  };

  return (
    <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
      <VoteCard poll={data} onAnswerChange={onAnswerChange} onVote={vote}>
        {msg && <p className={classNames('mt-6 text-center', color)}>{msg}</p>}
      </VoteCard>
    </div>
  );
};

export default HomePage;
