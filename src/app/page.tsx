import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GoPlay } from 'react-icons/go';

export default function Home() {
  return (
    <main className="px-6 py-10 text-center">
      <header className="grid gap-6">
        <h1 className="text-5xl underline">Moirai.js</h1>
        <p>A text based implementation of the moirai game</p>
      </header>

      <div className="my-14">
        <Link href="/play">
          <Button
            className="border-green-600 bg-zinc-950 px-8 py-8 text-4xl font-bold hover:bg-green-600"
            variant="outline"
          >
            <GoPlay className="mr-2" />
            Play
          </Button>
        </Link>
      </div>
    </main>
  );
}
