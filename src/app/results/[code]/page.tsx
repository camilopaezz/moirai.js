import { FC } from 'react';

type Props = {
  params: {
    code: string;
  };
};

const ResultPage: FC<Props> = async ({ params }) => {
  const { code: id } = params;
  return <div>id: {id}</div>;
};

export default ResultPage;
