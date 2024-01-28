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
      <body className={`${kumbhSans.className} antialiased grid h-screen grid-cols-sm-body grid-rows-body md:flex-row md:overflow-hidden md:grid-cols-md-body lg:grid-cols-lg-body`}>
          <Nav/>

        <SideNav/>

        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </body>
    </html>
  );
}