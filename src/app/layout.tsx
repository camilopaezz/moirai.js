import type { Metadata } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const IBMPlexMono = IBM_Plex_Mono({
  style: ['normal', 'italic'],
  weight: ['500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Moirai.js',
  description: 'A web and text based game of the moirai game.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${IBMPlexMono.className} bg-zinc-950 text-green-500`}>
        <div className="mx-auto h-screen max-w-[1200px]">
          <Navbar />
          {children}
          <footer className="w-full">
            <p className="flex h-10 items-center justify-center border-t-2 border-green-600 text-center">
              © {new Date().getFullYear()} Moirai.js
            </p>{' '}
          </footer>
        </div>
      </body>
    </html>
  );
}
