import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaShare, FaShareAlt } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Loading from '../../components/ui/Loading';
import SimpleCard from '../../components/ui/SimpleCard';
import Space from '../../components/ui/Space';
import Tooltip from '../../components/ui/Tooltip';
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
  const [copied, setCopied] = useState(false);

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

  const copyLink = () => {
    navigator.clipboard.writeText(`${APP_URL}/${code}`);
    setCopied(true);
  };

  return (
    <div className="min-h-screen md:h-screen md:min-h-0 p-8 md:px-[10%] space-y-12 md:space-y-0 md:space-x-12 flex flex-col md:flex-row justify-center items-center">
      <VoteCard
        poll={data}
        onAnswerChange={onAnswerChange}
        onVote={vote}
        isLoading={voteMutation.isLoading}
      >
        {msg && <p className={classNames('mt-6 text-center', color)}>{msg}</p>}
      </VoteCard>
      <SimpleCard className="p-8 w-full min-h-[50%]">
        <p className="text-2xl md:text-4xl text-center">Other options</p>
        <Space size="3xl" />
        <div>
          <Button className="w-full md:text-xl md:h-11" onClick={resultsClick}>
            Results
          </Button>
          <Space />
          <Button
            className="w-full md:text-xl md:h-11 mb-24 xl:mb-0"
            onClick={makeNewPollClick}
          >
            Make a new poll
          </Button>
        </div>
        <div className="mt-auto">
          <p className="text-lg">Share link:</p>
          <Space />
          <Input
            defaultValue={`${APP_URL}/${code}`}
            disabled={true}
            rightIcon={
              // <div>
              /* <FaShareAlt
                  size={21}
                  className="cursor-pointer"
                  onClick={copyLink}
                /> */
              // </div>
              <div>
                <Tooltip text={copied ? 'Copied' : 'Copy'}>
                  <FaShareAlt
                    data-tooltip-target="tooltip-default"
                    size={21}
                    className="cursor-pointer"
                    onClick={copyLink}
                  />
                </Tooltip>
              </div>
            }
          />
        </div>
      </SimpleCard>
    </div>
  );
};

export default PollPage;
