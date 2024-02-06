import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function Page() {
  return (
    <main className='flex flex-col items-center'>
      <h1 className='m-10'>Login or create your account!</h1>
			<a href='/login'><h2 className='border-2 p-6 mt-10 rounded-lg'>Login with Google</h2></a>
			<a href='/login'><h2 className='border-2 p-6 rounded-lg'>Login with Apple</h2></a>
			<a href='/login'><h2 className='border-2 p-6 rounded-lg'>Login with Facebook</h2></a>
			<p className='text-lg m-6 font-bold'>OR</p>
			<a href='/register'><h3 className='border-2 p-6 rounded-lg'>Register for an account</h3></a>
    </main>
  );
}