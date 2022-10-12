import classNames from 'classnames';
import { APP_NAME } from '@/config/constants';

interface AppNameTextProps {
  className?: string;
  onClick?: () => void;
}

const AppNameText: React.FC<AppNameTextProps> = ({ className, onClick }) => {
  return (
    <h1
      className={classNames(
        'font-medium text-3xl',
        { 'cursor-pointer': !!onClick },
        className
      )}
      onClick={onClick}
    >
      {APP_NAME}
    </h1>
  );
};

export default AppNameText;
