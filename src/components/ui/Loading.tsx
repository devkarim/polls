import Pulse from './Pulse';

interface LoadingProps {
  children?: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-8">
      <Pulse />
    </div>
  );
};

export default Loading;
