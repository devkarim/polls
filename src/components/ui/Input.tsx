import classNames from 'classnames';
import { Field, FieldAttributes } from 'formik';
import { HTMLInputTypeAttribute } from 'react';

export interface InputProps extends FieldAttributes<any> {
  form?: boolean;
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: (newValue: string) => void;
  type?: HTMLInputTypeAttribute;
  className?: string;
  parentClassName?: string;
  icon?: ReactElement;
  rightIcon?: ReactElement;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  label,
  onChange,
  type,
  icon,
  rightIcon,
  parentClassName,
  className,
  form = true,
  ...props
}) => {
  const inputProps = {
    placeholder,
    value,
    type,
    className: classNames(
      'border-2 border-black border-opacity-30 dark:border-white dark:border-opacity-10 bg-transparent py-[8px] rounded-lg focus:outline-none transition colors opacity hover:border-opacity-40 dark:hover:border-opacity-20 focus:!border-primary duration-300 w-full placeholder-gray-400 placeholder:text-base text-base dark:placeholder-opacity-50',
      { 'px-4': !icon && !rightIcon },
      { 'pl-10 pr-4': !!icon },
      { 'pl-4 pr-10': !!rightIcon },
      className
    ),
  };

  return (
    <div className={classNames('w-full relative', parentClassName)}>
      {label && <p className="text-left text-lg mb-2">{label}</p>}
      {icon && (
        <span
          className={classNames('absolute left-0 px-3 text-lg cursor-text', {
            'top-10': !!label,
            'top-1/4 bottom-1/4': !label,
          })}
        >
          {icon}
        </span>
      )}
      {form ? (
        <Field {...inputProps} {...props} />
      ) : (
        <input onChange={(e) => onChange?.(e.target.value)} {...inputProps} />
      )}
      {rightIcon && (
        <span
          className={classNames('absolute right-0 px-3 text-lg cursor-text', {
            'top-10': !!label,
            'top-1/4 bottom-1/4': !label,
          })}
        >
          {rightIcon}
        </span>
      )}
    </div>
  );
};

export default Input;
