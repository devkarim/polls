import classNames from 'classnames';
import TextLink from './TextLink';

interface IconLinkProps {
  className?: string;
  onClick: () => any;
  children?: React.ReactNode;
}

const IconLink: React.FC<IconLinkProps> = ({
  className,
  onClick,
  children,
}) => {
  return (
    <TextLink
      className={classNames('select-none', className)}
      onClick={onClick}
    >
      {children}
    </TextLink>
  );
};

export default IconLink;
