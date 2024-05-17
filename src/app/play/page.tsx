import Playbox from './components/Playbox';

const sendAction = async (e: any) => {
  'use server';

  console.log(e);
};

const PlayPage = () => {
  return (
    <main className="p-6">
      <Playbox
        sendAction={sendAction}
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
