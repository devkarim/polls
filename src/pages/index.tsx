import type { NextPage } from 'next';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Line from '../components/ui/Line';
import SimpleCard from '../components/ui/SimpleCard';
import Space from '../components/ui/Space';
import { useState } from 'react';
import MultipleInput from '../components/ui/MultipleInput';
import { trpc } from '../services/api/trpc';
import { useRouter } from 'next/router';
import useInfo from '../helpers/hooks/useInfo';
import classNames from 'classnames';
import { TRPCClientError } from '@trpc/client';
import { useAppDispatch } from '../state/hooks';
import { saveToken } from '../state/reducers/local';

interface PollCreationData {
  header: string;
  answers: string[];
  author: string;
}

const initialPollCreation: PollCreationData = {
  author: '',
  header: '',
  answers: [],
};

const HomePage: NextPage = () => {
  const router = useRouter();
  const [pollCreation, setPollCreation] =
    useState<PollCreationData>(initialPollCreation);
  const pollMutation = trpc.useMutation(['make-poll']);
  const { msg, color, setError } = useInfo();
  const dispatch = useAppDispatch();

  const updateHeader = (header: string) =>
    setPollCreation((prev) => {
      return { ...prev, header };
    });

  const updateAnswers = (answers: string[]) =>
    setPollCreation((prev) => {
      return { ...prev, answers };
    });

  const createPollClick = async () => {
    try {
      const author = localStorage.getItem('token');
      const { poll } = await pollMutation.mutateAsync({
        ...pollCreation,
        author,
      });
      if (poll) {
        await dispatch(saveToken(poll.author));
        router.push(`/${poll.code}`);
      }
    } catch (err) {
      // TODO: make a utility function to format this error
      if (err instanceof TRPCClientError) {
        setError((JSON.parse(err.message) as any)[0].message);
      }
    }
  };

  return (
    <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
      <h2>Create a poll</h2>
      <Space size="3xl" />
      <SimpleCard className="p-6 max-h-[75%] w-full max-w-xl overflow-auto">
        <div className="flex flex-col items-start">
          <Input
            id="header"
            label="Ask a question"
            placeholder="Did you say hi to your cat today?"
            onChange={updateHeader}
          />
          <Line className="my-6 self-center" />
          <p className="text-lg mb-2">Add answers</p>
          <MultipleInput
            placeholder="Option"
            addValueText="Add new answer"
            onChange={(answers) => updateAnswers(answers)}
          />
          <Space size="2xl" />
          <Button
            className="w-full"
            onClick={createPollClick}
            disabled={pollMutation.isLoading}
          >
            Create
          </Button>
        </div>
        {msg && <p className={classNames('mt-6 text-center', color)}>{msg}</p>}
      </SimpleCard>
    </div>
  );
};

export default HomePage;
