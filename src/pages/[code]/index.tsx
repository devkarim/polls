import classNames from 'classnames';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import useToken from '../../helpers/hooks/useClient';
import { trpc } from '../../services/api/trpc';
import useClient from '../../helpers/hooks/useClient';
import { toast, Toaster } from 'react-hot-toast';

const PollPage: NextPage = () => {
  const router = useRouter();
  const { code } = router.query as { code: string };
  const { data, isLoading, refetch, isRefetching } = trpc.useQuery(
    ['get-poll', { code }],
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  const voteMutation = trpc.useMutation(['vote-poll']);
  const updateMutation = trpc.useMutation(['vote-update']);
  const [chosenAnsId, setChosenAnswerId] = useState<string | null>(null);
  const { msg, color, setError, setInfo, resetAll } = useInfo();
  const client = useClient();
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
    if (data.status == 'CLOSED') return setError('Vote is closed.');
    const { id: pollId } = data;
    const res = await voteMutation.mutateAsync({ id: chosenAnsId, pollId });
    if (!res) return setError('Unable to vote, unexpected error.');
    if (res.success) {
      navigateToResults();
    } else {
      setError(res.message || 'Unable to vote, unexpected error.');
    }
  };

  const navigateToResults = () => {
    router.push(`/${code}/results`);
  };

  const makeNewPollClick = () => {
    router.push(`/`);
  };

  const closeOpenPoll = async () => {
    if (!client || !data) return;
    const res = await updateMutation.mutateAsync({
      id: data.id,
      author: client,
    });
    const correctVerb = data.status == 'OPEN' ? 'Close' : 'Open';
    if (!res)
      return toast.error(
        `Unable to ${correctVerb.toLowerCase()} vote, please try again later.`
      );
    if (res.success) {
      toast.success(
        `${
          correctVerb.endsWith('e')
            ? correctVerb.slice(0, correctVerb.length - 1)
            : correctVerb
        }ed vote successfully.`,
        {}
      );
    } else {
      toast.error(
        `Unable to ${correctVerb.toLowerCase()} vote, please try again later.`
      );
    }
    refetch();
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
          <Button
            className="w-full md:text-lg md:h-10"
            onClick={navigateToResults}
          >
            Results
          </Button>
          <Space />
          <Button
            className="w-full md:text-lg md:h-10 xl:mb-0"
            onClick={makeNewPollClick}
          >
            Make a new poll
          </Button>
          {data.author == client && (
            <div>
              <Space />
              <Button
                className="w-full md:text-lg md:h-10 xl:mb-0"
                onClick={closeOpenPoll}
                isLoading={updateMutation.isLoading || isRefetching}
              >
                {data.status == 'CLOSED' ? 'Open' : 'Close'} this poll
              </Button>
            </div>
          )}
        </div>
        <div className="mt-24">
          <p className="text-lg">Share link:</p>
          <Space />
          <Input
            defaultValue={`${APP_URL}/${code}`}
            disabled={true}
            rightIcon={
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
        <Toaster />
      </SimpleCard>
    </div>
  );
};

export default PollPage;
