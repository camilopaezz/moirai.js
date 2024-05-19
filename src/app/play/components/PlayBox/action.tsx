'use server';

import { redirect } from 'next/navigation';

interface SubmitDataParams {
  whyBlood: string;
  name: string;
  whatYouDone: string;
  whyKnife: string;
  hadKill: boolean;
}

export const submitData = async (data: SubmitDataParams) => {
  console.log(data);

  return redirect('/play/result');
};
