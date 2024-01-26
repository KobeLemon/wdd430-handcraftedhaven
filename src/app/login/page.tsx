import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Login',
};

export default async function Page() {
  return (
    <main>
      <h1>Login Page</h1>
    </main>
  );
}