import classNames from 'classnames';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface RadioButtonProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: React.ReactNode;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  className,
  children,
  ...props
}) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        className={classNames('w-6 h-6', className)}
        {...props}
      />
      <label htmlFor={id} className="ml-2 text-lg md:text-2xl">
        {children}
      </label>
    </div>
  );
};

export default RadioButton;
