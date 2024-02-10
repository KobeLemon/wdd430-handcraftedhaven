import { Artisan, User } from "@/app/lib/definitions";

export default function AccountCreation({name, pictures} : Artisan, {email}: User) {

	return (
		<>
			<div className="flex flex-col items-center gap-4 p-16 md:flex-row md:gap-16">
				<h1 className='text-center p-10'>Create Your Account!</h1>
				<h2 className='text-center'>All fields are required</h2>

				<form action="">
					<fieldset className="flex flex-col">
						<label htmlFor="name" defaultValue={name}>Full Name:</label>
						<input type="text" id="name" required/>

						<label htmlFor="email" defaultValue={email}>Email:</label>
						<input type="email" id="email" required/>

						<label htmlFor="description">About You:</label>
						<textarea name="description" id="description"></textarea>

						<label htmlFor="smallPicture">Small Profile Picture:</label>
						<input type="smallPicture" id="smallPicture" required/>

						<label htmlFor="mediumPicture">Medium Profile Picture:</label>
						<input type="mediumPicture" id="mediumPicture" required/>

						<label htmlFor="bigPicture" defaultValue={pictures.big}>Large Profile Picture:</label>
						<input type="bigPicture" id="bigPicture" required/>

						<button type="submit">Create Account!</button>
					</fieldset>
				</form>
			</div>
		</>
	)
}