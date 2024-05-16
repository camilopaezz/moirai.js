import Playbox from './components/Playbox';

const PlayPage = () => {
  return (
    <main className="p-6">
      <Playbox
        prevValues={{
          whatYouDone: 'nothing',
          whyBlood: 'because',
          whyKnife: 'because',
          name: 'John Doe',
        }}
      />
    </main>
  );
};

export default PlayPage;
