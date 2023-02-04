import { Answer } from '@prisma/client';
import Space from '@/components/ui/Space';
import HSpace from '../../../components/ui/HSpace';

interface VoteCardProps {
  children?: React.ReactNode;
  answer: Answer;
  totalVotes: number;
}

const VoteCard: React.FC<VoteCardProps> = ({ answer, totalVotes }) => {
  const { title, votes } = answer;

  if (totalVotes == 0) {
    totalVotes = 1;
  }

  const percent = (votes / totalVotes) * 100;

  return (
    <div className="p-4 w-full min-h-[50%]">
      <div className="flex items-center">
        <p className="text-2xl">{title}</p>
        <HSpace />
        <p className="opacity-60 text-lg">· {percent} %</p>
      </div>
      <Space />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-xl">
        <div
          className="h-4 bg-green-500 rounded-xl"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default VoteCard;
