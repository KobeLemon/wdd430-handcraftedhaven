import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';
import './globals.css';

const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['400', '700']
})

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
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={kumbhSans.className}>{children}</body>
    </html>
  )
}