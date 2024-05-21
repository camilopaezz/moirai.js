import Link from 'next/link';
import { Button } from './ui/button';
import { TbBrandGithub, TbCrystalBall } from 'react-icons/tb';

const Navbar = () => {
  return (
    <nav className="flex w-full justify-center border-b-2 border-b-green-600">
      <div className="flex h-20 w-full items-center justify-between px-6">
        <Link href="/">
          <span className="text-xl font-bold underline">Moirai.js</span>
        </Link>

        <div className="flex items-center justify-center gap-4">
          <Link href="https://github.com/camilopaezz/moirai.js" target="_blank">
            <Button
              className="border-green-600 bg-zinc-950 font-bold hover:bg-green-600"
              variant="outline"
            >
              <TbBrandGithub className="text-xl" />
            </Button>
          </Link>
          <Link href="/fate">
            <Button
              className="border-green-600 bg-zinc-950 font-bold hover:bg-green-600"
              variant="outline"
            >
              <TbCrystalBall className="mr-2 text-xl" />
              Know your fate
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
