import { FC } from 'react';

type Props = {
  params: {
    code: string;
  };
};

export const CodePage: FC<Props> = ({ params }) => {
  const { code } = params;

  return <div>{}</div>;
};
