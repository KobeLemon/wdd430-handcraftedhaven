import { ArtisanUser } from "@/app/lib/definitions";
import { Metadata } from 'next';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Account Creation',
};

export default function AccountCreation({name, email, pictures } : ArtisanUser) {

	const formSubmission = async(e:any) => {
		e.preventDefault()

		const formValues = new FormData(e.target);

		const userData = {
			name: formValues.get('name'),
			email: formValues.get('email')
		}

		const artisanData = {
			name: formValues.get('name'),
			description: formValues.get('description'),
			pictures: formValues.get('image')
		}

		try{
			const results = await fetch('/api/createUser', {
				method:'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({User: userData, Artisan: artisanData})
			})
			window.location.href = "/profile"
		}catch(error:any){
			console.error({message:'Error: could not create new user.'})
		}
	}

	return (
		<>
			<div className="flex flex-col items-center gap-4 p-16 md:gap-16">
				<div>
					<h1 className='text-center pt-10'>Create Your Account!</h1>
					<h2 className='text-center m-2 text-2xl'>All fields are required</h2>
					<h3 className='text-center mt-5 mb-1 text-xl'>If you leave this page without completing the <br/>below form, your account will not be created.</h3>
				</div>

				<form id="creationForm" onSubmit={formSubmission}>
					<fieldset className="flex flex-col gap-2 col-span-1 items-center">
							<label className="w-full" htmlFor="name" >Full Name:</label>
							<input className="w-80 rounded" name="name" type="text" id="name" value={name} readOnly required/>

							<label className="w-full" htmlFor="email" >Email:</label>
							<input className="w-80 rounded" name="email" type="email" id="email" value={email} readOnly required/>

							<label className="w-full" htmlFor="description">About You:</label>
							<textarea className="w-80 rounded" name="description" id="description"></textarea>

							<label className="w-full" htmlFor="image" >Profile Picture:</label>
							<input className="w-80 rounded" name="image" type="text" id="image" value={pictures.big} readOnly required/>

						<button className="border border-gray-500 border-solid p-2 h-fit w-fit rounded" id="submit" type="submit">Create Account!</button>
					</fieldset>
				</form>
			</div>
		</>
	)
}