import classNames from 'classnames';

interface LineProps {
  className?: string;
}

const Line: React.FC<LineProps> = ({ className }) => {
  return (
    <hr
      className={classNames(
        'border-black dark:border-white dark:border-opacity-20 border-opacity-20 w-2/3',
        className
      )}
    />
  );
};

export default Line;
