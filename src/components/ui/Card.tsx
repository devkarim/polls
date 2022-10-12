import classNames from 'classnames';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div
      className={classNames(
        'shadow-md rounded-2xl border-[1px] border-gray-200 p-4',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
