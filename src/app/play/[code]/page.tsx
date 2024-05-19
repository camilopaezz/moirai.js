import Link from 'next/link';
import { FC } from 'react';
import { GoLinkExternal } from 'react-icons/go';

type Props = {
  params: {
    code: string;
  };
};

const CodePage: FC<Props> = ({ params }) => {
  const { code } = params;
  const destinyPath = `/destiny/${code}`;
  const destinyUrl = 'moirai-js.vercel.app'.concat(destinyPath);

  return (
    <div className="p-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-5xl">Your story is over for now...</h1>

        <span className="text-xl">Your code is:</span>
        <div className="flex flex-col gap-1">
          <Link
            href={`/destiny/${code}`}
            className="w-fit rounded-xl border-2 border-green-500 p-4 text-6xl hover:underline"
          >
            {'0'.repeat(8 - code.length).concat(code)}
          </Link>
          <Link
            className="inline-flex items-center gap-2 hover:underline"
            href={destinyPath}
          >
            {destinyUrl}
            <GoLinkExternal />
          </Link>
        </div>

        <p>Wait some time, someone will choose your destiny</p>
      </div>
    </div>
  );
};

export default CodePage;
