import '@/app/ui/global.css'

import type { Metadata } from 'next';
import SideNav from '@/app/ui/sidenav/sidenav';
import { kumbhSans } from '@/app/ui/fonts';
import Nav from '@/app/ui/header/nav';
import { ShoppingCartProvider } from './ui/header/shopping-cart';

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Home',
  },
  description: 'Handcrafted Haven is an innovative web application that aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items.',
}

 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className={`${kumbhSans.className} antialiased max-w-[1400px] mx-auto grid h-screen grid-cols-[4rem_1fr] grid-rows-[5rem_1fr] md:flex-row md:overflow-hidden md:grid-cols-[6rem_1fr] lg:grid-cols-[10rem_1fr]`}>
        <ShoppingCartProvider>
          <Nav />
          <SideNav />
          <div className="overflow-y-auto my-o mx-auto w-full">
            {children}
          </div>
        </ShoppingCartProvider>
      </body>

    </html>
  );
}