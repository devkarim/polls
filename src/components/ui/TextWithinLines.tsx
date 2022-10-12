import classNames from 'classnames';

interface TextWithinLinesProps {
  className?: string;
  children?: React.ReactNode;
}

const TextWithinLines: React.FC<TextWithinLinesProps> = ({
  className,
  children,
}) => {
  return (
    <div className={classNames('flex items-center opacity-60', className)}>
      <Line />
      <span className="px-4">{children}</span>
      <Line />
    </div>
  );
};

const Line: React.FC<any> = ({}) => {
  return <hr className="w-full border-black border-opacity-60" />;
};

export default TextWithinLines;
