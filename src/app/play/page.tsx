import { getLatestRun } from '@/db/actions/runs';
import Playbox from './components/PlayBox';

const PlayPage = async () => {
  const { whatYouDone, whyBlood, whyKnife, name } = await getLatestRun();

  return (
    <main className="p-6">
      <Playbox
        prevValues={{
          whatYouDone,
          whyBlood,
          whyKnife,
          name,
        }}
      />
    </main>
  );
};

export default PlayPage;
