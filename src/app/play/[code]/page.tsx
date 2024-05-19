import Link from 'next/link';
import { FC } from 'react';

type Props = {
  params: {
    code: string;
  };
};

const CodePage: FC<Props> = ({ params }) => {
  const { code } = params;

  return (
    <div className="p-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-5xl">Your story is over for now...</h1>

        <span className="text-xl">Your code is:</span>
        <Link
          href={`/destiny/${code}`}
          className="w-fit rounded-xl border-2 border-green-500 p-4 text-6xl hover:underline"
        >
          {'0'.repeat(8 - code.length).concat(code)}
        </Link>

        <p>Wait for someone that will choose your destiny</p>
      </div>
    </div>
  );
};

export default CodePage;
