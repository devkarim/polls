import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const HomePage: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col items-center justify-center p-8">
      Hi {code}
    </div>
  );
};

export default HomePage;
