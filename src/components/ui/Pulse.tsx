import Image from 'next/image';
import useColorModeValue from '../../helpers/hooks/useColorModeValue';

interface PulseProps {
  size?: number;
}

const Pulse: React.FC<PulseProps> = ({ size = 64 }) => {
  return (
    <Image
      alt="pulse"
      src="/svg/pulse.svg"
      width={size}
      height={size}
      className="light-filter dark:dark-filter"
    />
  );
};

export default Pulse;
