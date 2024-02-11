import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artisan Profile',
};

export default function Page() {
  return (
    <>
      <h1 className='text-center p-10'>Welcome Back Artisan!</h1>
    </>
  );
}