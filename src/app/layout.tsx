import '@/app/ui/global.css'
import type { Metadata } from 'next';
import SideNav from '@/app/ui/sidenav/sidenav';
import { kumbhSans } from '@/app/ui/fonts';
import Nav from '@/app/ui/header/nav';
import { ShoppingCartProvider } from './ui/header/shopping-cart';
import { getServerSession } from 'next-auth';
import SessionProvider from './components/SessionProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Home',
  },
  description: 'Handcrafted Haven is an innovative web application that aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

	const session = await getServerSession();

  return (
    <html lang="en">

      <body className={`${kumbhSans.className} antialiased grid h-screen grid-cols-[4rem_1fr] grid-rows-[5rem_1fr] md:flex-row md:overflow-hidden md:grid-cols-[6rem_1fr] lg:grid-cols-[10rem_1fr] max-w-[1440px] mx-auto`}>
      <SessionProvider session={session}>
				<ShoppingCartProvider>
						<Nav />
						<SideNav />
						<div className="overflow-y-auto my-o mx-auto w-full">{children}</div>
				</ShoppingCartProvider>
      </SessionProvider>
      </body>

    </html>
  );
}