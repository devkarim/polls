import classNames from 'classnames';
import Link from 'next/link';

interface TextLinkProps {
  onClick?: () => void;
  to?: string;
  className?: string;
  children?: React.ReactNode;
}

const TextLink: React.FC<TextLinkProps> = ({
  onClick,
  to,
  className,
  children,
}) => {
  const content = (
    <span
      className={classNames(
        'cursor-pointer transition-opacity hover:opacity-80',
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );

  if (!to) return content;

  return <Link href={to}>{content}</Link>;
};

export default TextLink;
