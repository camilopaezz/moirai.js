import { FC } from 'react';

type Props = {
  params: {
    code: string;
  };
};

const CodePage: FC<Props> = ({ params }) => {
  const { code } = params;

  return <div>{code}</div>;
};

export default CodePage;
