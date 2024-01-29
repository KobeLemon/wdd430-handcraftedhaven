import '@/app/ui/global.css'

import type { Metadata } from 'next';
import SideNav from '@/app/ui/sidenav';
import { kumbhSans } from '@/app/ui/fonts';
import Nav from '@/app/ui/nav';

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

      <body className={`${kumbhSans.className} antialiased grid h-screen grid-cols-[4rem_1fr] grid-rows-[5rem_1fr] md:flex-row md:overflow-hidden md:grid-cols-[6rem_1fr] lg:grid-cols-[10rem_1fr]`}>

        <Nav/>

        <SideNav/>

        <div className="p-6 md:overflow-y-auto md:p-12">{children}</div>

      </body>

    </html>
  );
}