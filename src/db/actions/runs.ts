import { RunData } from '@/types';
import db from '../drizzle';
import { link, run } from '../schema';
import { desc, eq } from 'drizzle-orm';

export const getLatestRun = async () => {
  const latestRun = await db
    .select()
    .from(run)
    .orderBy(desc(run.code))
    .limit(1);

  return latestRun[0];
};

export const createLink = async (accusedCode: number) => {
  if (accusedCode) {
    const newLink = await db
      .insert(link)
      .values({ accused: accusedCode })
      .returning({ insertedId: link.id });

    return newLink[0].insertedId;
  }
};

export const createRun = async (runData: RunData) => {
  const lastestRun = await getLatestRun();
  const accusedLinkId = await createLink(lastestRun.code);

  const newRun = await db
    .insert(run)
    .values({
      ...runData,
      link: accusedLinkId,
    })
    .returning({ insertedId: run.code });

  await db
    .update(link)
    .set({ judge: newRun[0].insertedId })
    .where(eq(link.accused, lastestRun.code));

  await db
    .update(run)
    .set({ beenKilled: runData.hadKilled })
    .where(eq(run.code, lastestRun.code));

  return {
    newRunCode: newRun[0].insertedId,
    accusedCode: lastestRun.code,
  };
};

export const getRunByCode = async (code: number) => {
  const runData = await db.select().from(run).where(eq(run.code, code));

  return runData[0];
};
