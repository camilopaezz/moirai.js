import Link from 'next/link';
import { Button } from './ui/button';
import { GoPlay } from 'react-icons/go';

const Navbar = () => {
  return (
    <nav className="flex w-full justify-center border-b-2 border-b-green-600">
      <div className="flex h-20 w-full items-center justify-between px-6">
        <Link href="/">
          <span className="text-xl font-bold underline">Moirai.js</span>
        </Link>

        <div className="flex items-center justify-center gap-4">
          <Link href="/play">
            <Button
              className="border-green-600 bg-zinc-950 font-bold hover:bg-green-600"
              variant="outline"
            >
              <GoPlay className="mr-2 text-xl" />
              Play
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
