import Image from 'next/image';

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 64 }) => {
  return (
    <Image
      alt="oval"
      src="/svg/oval.svg"
      width={size}
      height={size}
      className="light-filter dark:dark-filter"
    />
  );
};

export default Spinner;
