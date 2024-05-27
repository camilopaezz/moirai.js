import { Ulid } from 'id128';
import { sql } from '..';

export interface Run {
  runId: number;
  publicId: string;
  name: string;
  whyBlood: string;
  whyKnife: string;
  whatYouDone: string;
  hadKill: boolean;
  judgeId: number | null;
}

export type RunColums = Array<keyof Run>;
export type RunCreator = Omit<Run, 'runId' | 'publicId' | 'judgeId'>;

export type SafeRun = Omit<Run, 'runId' | 'judgeId'>;
export type SafeRunColums = Array<keyof SafeRun>;

export const getLatestRunData = async () => {
  const colums: RunColums = [
    'name',
    'whyBlood',
    'whyKnife',
    'whatYouDone',
    'hadKill',
  ];

  const latestRun = await sql<Run[]>`
    SELECT ${sql(colums)} FROM run ORDER BY run_id DESC LIMIT 1
  `;

  if (latestRun.length === 0) {
    return null;
  }

  return latestRun[0];
};

// export const getLatestRunId = async () => {
//   const latestRunId = await sql<Run[]>`
//     SELECT public_id FROM run ORDER BY run_id DESC LIMIT 1
//   `;

//   if (latestRunId.length === 0) {
//     return null;
//   }

//   return latestRunId[0].runId;
// };

type createRunReturn = Pick<Run, 'publicId'>;

export const createRun = async (
  runDataParams: RunCreator,
): Promise<createRunReturn> => {
  const runData = {
    ...runDataParams,
    publicId: Ulid.generate().toRaw(),
  };

  const newRun = await sql<createRunReturn[]>`
    INSERT INTO run ${sql(runData)} RETURNING public_id
  `;

  return newRun[0];
};

export type getFateByIdReturn = { beenKilled: boolean };

export const getFateById = async (id: string) => {
  const run = await sql<getFateByIdReturn[]>`
   SELECT run_judge.had_kill AS "beenKilled"
   FROM run
   INNER JOIN run AS run_judge 
   ON run.judge_id = run_judge.run_id 
   WHERE run.public_id = ${id};
`;

  if (run.length === 0) {
    return null;
  }

  return run[0];
};

export const getRunDataById = async (id: string) => {
  const colums: SafeRunColums = [
    'hadKill',
    'name',
    'whatYouDone',
    'whyBlood',
    'whyKnife',
    'publicId',
  ];

  const run = await sql<SafeRun[]>`
    SELECT ${colums} FROM run WHERE public_id = ${id}
  `;

  if (run.length === 0) {
    return null;
  }

  return run[0];
};
