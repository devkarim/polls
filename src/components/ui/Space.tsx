interface SpaceProps {
  size?: ComponentSize;
  className?: string;
}

export const sizeToNumber = (size: ComponentSize) => {
  if (size == 'xs') return 2;
  if (size == 'sm') return 4;
  if (size == 'md') return 6;
  if (size == 'lg') return 8;
  if (size == 'xl') return 12;
  if (size == '2xl') return 16;
  if (size == '3xl') return 21;
  return size;
};

const Space: React.FC<SpaceProps> = ({ size = 'md', className }) => {
  const s = sizeToNumber(size);
  return <div className={className} style={{ paddingBlock: s }} />;
};

export default Space;
