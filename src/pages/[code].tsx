import type { NextPage } from 'next';
import { useRouter } from 'next/router';
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

  if (isLoading) return <Loading />;

  if (!data)
    return (
      <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
        <h2>404 - Poll Not Found</h2>
      </div>
    );

  return (
    <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
      <VoteCard poll={data} />
    </div>
  );
};

export default HomePage;
