import { Answer, Poll } from '@prisma/client';
import Button from '@/components/ui/Button';
import HSpace from '@/components/ui/HSpace';
import RadioButton from '@/components/ui/RadioButton';
import SimpleCard from '@/components/ui/SimpleCard';
import Space from '@/components/ui/Space';
import { timeSince } from '@/helpers/utils';

interface VoteCardProps {
  children?: React.ReactNode;
  poll: Poll & { answers: Answer[] };
}

const VoteCard: React.FC<VoteCardProps> = ({ poll }) => {
  const { header, answers, createdAt } = poll;
  const actualCreatedAt = new Date(createdAt as unknown as string);

  return (
    <SimpleCard className="p-8 w-[50%]">
      <div className="flex items-center">
        <h2>{header}</h2>
        <HSpace />
        <p className="opacity-60 text-lg">
          · {timeSince(actualCreatedAt.getTime())} ago
        </p>
      </div>
      <Space size="2xl" />
      <h5 className="opacity-60">Choose an answer:</h5>
      <Space size="2xl" />
      {answers.map((a) => {
        return (
          <div key={a.id}>
            <RadioButton id={a.id} value={a.title} name="answers">
              {a.title}
            </RadioButton>
            <Space />
          </div>
        );
      })}
      <Space size="2xl" />
      <Button className="w-full h-12 text-xl">Vote</Button>
    </SimpleCard>
  );
};

export default VoteCard;
