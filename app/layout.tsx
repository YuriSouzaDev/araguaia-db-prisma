import { ToasterProvider } from '@/providers/toast-provider';
import { UserContextProvider } from '@/stores/user-context';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { userGet } from '../actions/user-get';
import './globals.css';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await userGet();
  return (
    <html lang="pt">
      <body
        className={`min-h-screen w-full relative ${nunito.className} bg-custom-bodyBg`}
      >
        <UserContextProvider user={user}>
          {' '}
          <ToasterProvider />
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
