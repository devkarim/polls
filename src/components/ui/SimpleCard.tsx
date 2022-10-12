import classNames from 'classnames';

interface SimpleCardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  className,
  onClick,
  children,
}) => {
  return (
    <div
      className={classNames(
        'border-2 border-black dark:border-white dark:border-opacity-20 border-opacity-20 rounded-md',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default SimpleCard;
