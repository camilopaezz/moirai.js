import { getLatestRunData } from '@/db/actions/runs';
import Playbox from './components/PlayBox';

const PlayPage = async () => {
  const latestRun = await getLatestRunData();

  if (!latestRun) {
    return <div>error...</div>;
  }

  const { whatYouDone, whyBlood, whyKnife, name } = latestRun;

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
