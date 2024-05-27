import Heading from '@/components/Heading';
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
  const fatePath = `/fate/${code}`;
  const fateUrl = 'moiraijs.vercel.app'.concat(fatePath);

  return (
    <div className="p-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <Heading>Your story is over for now...</Heading>

        <span className="text-xl">Your code is:</span>
        <div className="flex flex-col gap-1">
          <Link
            href={`/fate/${code}`}
            className="mx-auto w-fit rounded-xl border-2 border-green-500 p-4 hover:underline sm:text-lg md:text-4xl xl:text-5xl"
          >
            {code}
          </Link>
          <Link
            className="mx-auto inline-flex items-center gap-2 break-all hover:underline"
            href={fatePath}
          >
            {fateUrl}
            <GoLinkExternal />
          </Link>
        </div>

        <p>Wait some time, someone will choose your fate</p>
      </div>
    </div>
  );
};

export default CodePage;
