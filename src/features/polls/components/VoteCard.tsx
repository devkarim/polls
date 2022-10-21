import { Answer, Poll } from '@prisma/client';
import Button from '@/components/ui/Button';
import HSpace from '@/components/ui/HSpace';
import RadioButton from '@/components/ui/RadioButton';
import SimpleCard from '@/components/ui/SimpleCard';
import Space from '@/components/ui/Space';
import { timeSince } from '@/helpers/utils';
import { useMemo } from 'react';

interface VoteCardProps {
  children?: React.ReactNode;
  poll: Poll & { answers: Answer[] };
  onAnswerChange?: (id: string) => any;
  onVote?: () => any;
}

const VoteCard: React.FC<VoteCardProps> = ({
  poll,
  onAnswerChange,
  onVote,
  children,
}) => {
  const { header, answers, createdAt } = poll;

  const timeAgo = useMemo(() => {
    const actualCreatedAt = new Date(createdAt as unknown as string);
    return timeSince(actualCreatedAt.getTime());
  }, [createdAt]);

  return (
    <SimpleCard className="p-8 w-[50%]">
      <div className="flex items-center">
        <h2>{header}</h2>
        <HSpace />
        <p className="opacity-60 text-lg">· {timeAgo} ago</p>
      </div>
      <Space size="2xl" />
      <h5 className="opacity-60">Choose an answer:</h5>
      <Space size="2xl" />
      {answers.map((a) => {
        return (
          <div key={a.id}>
            <RadioButton
              id={a.id}
              value={a.title}
              name="answers"
              onChange={() => onAnswerChange && onAnswerChange(a.id)}
            >
              {a.title}
            </RadioButton>
            <Space />
          </div>
        );
      })}
      <Space size="2xl" />
      <Button className="w-full h-12 text-xl" onClick={onVote}>
        Vote
      </Button>
      {children}
    </SimpleCard>
  );
};

export default VoteCard;
