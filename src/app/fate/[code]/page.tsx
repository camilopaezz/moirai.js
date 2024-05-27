import { getFateById } from '@/db/actions/runs';
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

  if (code.length !== 26) {
    return notFound();
  }

  const beenKilled = await getFateById(code);

  if (beenKilled === 'error') {
    return notFound();
  }

  if (beenKilled === null) {
    return (
      <div className="flex flex-col items-center gap-6 p-6 text-center">
        <Heading>Your fate is being decided...</Heading>
        <div className="w-fit rounded-xl border-2 border-green-500 p-4 sm:text-xl md:text-4xl xl:text-5xl">
          {code}
        </div>
        <p>Wait some time, someone will choose your Fate</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 text-center">
      {beenKilled ? (
        <Heading>
          You have been <span className="font-bold">killed!</span>
        </Heading>
      ) : (
        <Heading>
          You have been <span className="font-bold">let go!</span>
        </Heading>
      )}
      <div className="w-fit rounded-xl border-2 border-green-500 p-4 sm:text-xl md:text-4xl xl:text-5xl">
        {code}
      </div>
      {beenKilled ? (
        <p>Your words wasn&apos;t enough...</p>
      ) : (
        <p>Your words are convincing...</p>
      )}
    </div>
  );
};

export default FatePage;
