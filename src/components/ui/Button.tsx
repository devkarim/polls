import classNames from 'classnames';

interface ButtonProps {
  width?: ComponentSize;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'solid' | 'outline';
  className?: string;
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
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
