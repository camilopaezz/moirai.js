'use server';

import { RunCreator } from '@/db/actions/runs';
import { createRun } from '@/db/actions/runs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const submitData = async (data: RunCreator) => {
  const { publicId } = await createRun(data);

  revalidatePath('/play');
  revalidatePath(`/fate/${publicId}`);

  return redirect(`/play/${publicId}`);
};
