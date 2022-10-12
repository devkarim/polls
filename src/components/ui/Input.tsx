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
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  label,
  onChange,
  type,
  icon,
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
      'border-2 border-black dark:border-white bg-transparent py-[8px] rounded-lg focus:outline-none transition colors opacity dark:hover:border-gray-300 focus:!border-primary duration-300 w-full placeholder-gray-400 placeholder:text-base text-base dark:placeholder-gray-200',
      { 'px-10': !!icon, 'px-4': !icon },
      className
    ),
  };

  return (
    <div className={classNames('relative', parentClassName)}>
      {label && <p className="text-left mb-1">{label}</p>}
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
    </div>
  );
};

export default Input;
