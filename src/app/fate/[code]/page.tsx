import { getRunByCode } from '@/db/actions/runs';
import Heading from '@/components/Heading';
import { notFound } from 'next/navigation';
import { FC } from 'react';

type Props = {
  params: {
    code: string;
  };
};

const FatePage: FC<Props> = async ({ params }) => {
  const { code } = params;

  if (isNaN(Number(code))) {
    return notFound();
  }

  const run = await getRunByCode(Number(code));

  if (!run) {
    return notFound();
  }

  const beenKilled = run.beenKilled;

  if (beenKilled === null) {
    return (
      <div className="flex flex-col items-center gap-6 p-6 text-center">
        <Heading>Your fate is being decided...</Heading>
        <div className="w-fit rounded-xl border-2 border-green-500 p-4 text-6xl hover:underline">
          {'0'.repeat(8 - code.length).concat(code)}
        </div>
        <p>Wait some time, someone will choose your Fate</p>
      </div>
    );
  }

  if (beenKilled) {
    return (
      <div className="flex flex-col items-center gap-6 p-6 text-center">
        <Heading>
          You have been <span className="font-bold">killed!</span>
        </Heading>
        <div className="w-fit rounded-xl border-2 border-green-500 p-4 text-6xl">
          {'0'.repeat(8 - code.length).concat(code)}
        </div>
        <p>Your words wasn&apos;t enough...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 text-center">
      <Heading>
        You have been <span className="font-bold">let go!</span>
      </Heading>
      <div className="w-fit rounded-xl border-2 border-green-500 p-4 text-6xl">
        {'0'.repeat(8 - code.length).concat(code)}
      </div>
      <p>Your words are convincing...</p>
    </div>
  );
};

export default FatePage;
