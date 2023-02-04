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
        'text-sm text-center tracking-wide text-[#303030] dark:text-[#e9e9e9] py-6',
        className
      )}
    >
      <p>
        Copyright © 2021-{new Date().getFullYear()} {APP_NAME} - All Rights
        Reserved.
      </p>
      <p>
        Made with <span className="text-red-500">❤️</span> by{' '}
        <span className="font-bold text-teal-800 dark:text-teal-200">
          <Link href="https://github.com/devkarim" target="_blank">
            devkarim
          </Link>
        </span>
      </p>
    </div>
  );
};

export default Copyright;
