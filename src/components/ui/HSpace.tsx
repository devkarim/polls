import { sizeToNumber } from './Space';

interface HSpaceProps {
  size?: ComponentSize;
  className?: string;
}

const HSpace: React.FC<HSpaceProps> = ({ className, size = 'md' }) => {
  const s = sizeToNumber(size);
  return <div className={className} style={{ paddingInline: s }} />;
};

export default HSpace;
