import classNames from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Loading from './Loading';
import Pulse from './Pulse';
import Spinner from './Spinner';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  width?: ComponentSize;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'solid' | 'outline';
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  width,
  type,
  variant = 'solid',
  className,
  children,
  onClick,
  isLoading,
  disabled,
  ...props
}) => {
  return (
    <button
      type={type}
      className={classNames(
        'h-fit px-4 py-1 transition colors opacity duration-300',
        {
          'bg-black text-white dark:text-black dark:bg-white hover:opacity-90 rounded-lg font-medium':
            variant == 'solid',
          'border-2 border-black hover:bg-black rounded-lg hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black':
            variant == 'outline',
          'cursor-default': isLoading,
        },
        className
      )}
      onClick={onClick}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <Spinner size={26} /> : children}
    </button>
  );
};

export default Button;
