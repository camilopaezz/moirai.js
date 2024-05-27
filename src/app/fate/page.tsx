import React from 'react';
import { Metadata } from 'next';

import Heading from '@/components/Heading';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Search Fate - Moirai.js',
  description: 'Search for your fate',
};

const searchAction = async (formData: FormData) => {
  'use server';
  const code = formData.get('code') as string;

  redirect(`/fate/${code}`);
};

const FateSearchPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-6 p-6 text-center">
      <Heading>Search for your fate</Heading>
      <form
        action={searchAction}
        className="h-14 overflow-hidden rounded-xl border-2 border-green-500"
      >
        <input
          autoFocus
          placeholder="Copy your code here..."
          className="h-full w-80 bg-zinc-950 px-2 focus:bg-zinc-950"
          type="text"
          name="code"
          minLength={26}
          maxLength={26}
        />
        <button className="h-full border-l-2 border-green-500 p-2">
          Search
        </button>
      </form>
    </div>
  );
};

export default FateSearchPage;
