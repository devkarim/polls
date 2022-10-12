import classNames from 'classnames';
import Button from './Button';

interface IconButtonProps {
  icon: ReactElement;
  size?: ComponentSize;
  variant?: 'solid' | 'transparent';
  onClick: () => void;
  className?: string;
  textClassName?: string;
  title: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  variant,
  onClick,
  className,
  textClassName,
  title,
}) => {
  return (
    <Button
      className={classNames(`flex flex-row items-center`, className)}
      onClick={onClick}
    >
      {icon}
      <span className={classNames('ml-3', textClassName)}>{title}</span>
    </Button>
  );
};

export default IconButton;
