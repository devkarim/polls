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

interface PollCreationData {
  header: string;
  answers: string[];
}

const initialPollCreation: PollCreationData = {
  header: '',
  answers: [],
};

const HomePage: NextPage = () => {
  const router = useRouter();
  const [pollCreation, setPollCreation] =
    useState<PollCreationData>(initialPollCreation);
  const pollMutation = trpc.useMutation(['make-poll']);

  const updateHeader = (header: string) =>
    setPollCreation((prev) => {
      return { ...prev, header };
    });

  const updateAnswers = (answers: string[]) =>
    setPollCreation((prev) => {
      return { ...prev, answers };
    });

  const createPollClick = async () => {
    const poll = await pollMutation.mutateAsync(pollCreation);
    router.push(`/${poll.code}`);
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
      </SimpleCard>
    </div>
  );
};

export default HomePage;
