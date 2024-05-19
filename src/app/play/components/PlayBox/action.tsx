'use server';

import { RunData, createRun } from '@/db/actions/runs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const submitData = async (data: RunData) => {
  console.log(data);

  const createdId = await createRun(data);

  revalidatePath('/play');
  return redirect(`/result/${createdId}`);
};
