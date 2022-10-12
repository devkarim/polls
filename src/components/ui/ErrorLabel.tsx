import classNames from 'classnames';

interface ErrorLabelProps {
  message?: string;
  show?: boolean;
  center?: boolean;
}

const ErrorLabel: React.FC<ErrorLabelProps> = ({ message, show, center }) => {
  if (!show) return null;
  if (!message) return null;
  return (
    <p
      className={classNames(
        {
          'text-center': center,
        },
        'font-medium text-red-500 dark:text-red-600'
      )}
    >
      {message}
    </p>
  );
};

export default ErrorLabel;
