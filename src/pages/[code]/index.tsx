import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Loading from '../../components/ui/Loading';
import SimpleCard from '../../components/ui/SimpleCard';
import Space from '../../components/ui/Space';
import { APP_URL } from '../../config/constants';
import VoteCard from '../../features/polls/components/VoteCard';
import useInfo from '../../helpers/hooks/useInfo';
import { trpc } from '../../services/api/trpc';

const PollPage: NextPage = () => {
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

  const resultsClick = () => {
    router.push(`/${code}/results`);
  };

  const makeNewPollClick = () => {
    router.push(`/`);
  };

  return (
    <div className="min-h-screen md:h-screen md:min-h-0 p-8 md:px-[10%] space-y-12 md:space-y-0 md:space-x-12 flex flex-col md:flex-row justify-center items-center">
      <VoteCard poll={data} onAnswerChange={onAnswerChange} onVote={vote}>
        {msg && <p className={classNames('mt-6 text-center', color)}>{msg}</p>}
      </VoteCard>
      <SimpleCard className="p-8 w-full min-h-[50%]">
        <h3 className="text-center">Other options</h3>
        <Space size="3xl" />
        <div>
          <Button className="w-full text-xl h-11" onClick={resultsClick}>
            Results
          </Button>
          <Space />
          <Button
            className="w-full text-xl h-11 mb-24 xl:mb-0"
            onClick={makeNewPollClick}
          >
            Make a new poll
          </Button>
        </div>
        <div className="mt-auto">
          <p className="text-lg">Share link:</p>
          <Space />
          <Input defaultValue={`${APP_URL}/${code}`} disabled={true} />
        </div>
      </SimpleCard>
    </div>
  );
};

export default PollPage;
