'use server';

import { createRun } from '@/db/actions/runs';
import { RunData } from '@/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const submitData = async (data: RunData) => {
  console.log(data);

  const { accusedCode, newRunCode } = await createRun(data);

  revalidatePath('/play');
  revalidatePath(`/destiny/${accusedCode}`);

  return redirect(`/play/${newRunCode}`);
};
