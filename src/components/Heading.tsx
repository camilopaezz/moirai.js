import clsx from 'clsx';
import { FC } from 'react';

type HeadingProps = {
  underline?: boolean;
  children: any;
  classname?: string;
};

const Heading: FC<HeadingProps> = ({ underline, children, classname }) => {
  return (
    <h1 className={clsx('text-5xl', underline && 'underline', classname)}>
      {children}
    </h1>
  );
};

export default Heading;
