import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
};


export default async function Page() {
	return (
		<main className='flex flex-col items-center'>
			<form action="/">
				<fieldset className='m-10'>
					<legend>Register Your Account!</legend>

				</fieldset>
			</form>
		</main>
	)
}