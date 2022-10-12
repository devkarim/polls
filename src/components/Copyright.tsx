import classNames from 'classnames';
import Link from 'next/link';
import { APP_NAME } from '../config/constants';

interface CopyrightProps {
  className?: string;
}

const Copyright: React.FC<CopyrightProps> = ({ className }) => {
  return (
    <div
      className={classNames(
        'text-xs text-center tracking-wide text-[#818181] dark:text-[#e9e9e9]',
        className
      )}
    >
      <p>Copyright © 2021-2022 {APP_NAME} - All Rights Reserved.</p>
      <p>
        Made with <span className="text-white">❤️</span> by{' '}
        <Link href="https://github.com/devkarim" target="_blank">
          devkarim.
        </Link>
      </p>
    </div>
  );
};

export default Copyright;
