import { ArtisanUser } from "@/app/lib/definitions";

export default function AccountCreation({name, pictures, email} : ArtisanUser) {
	return (
		<>
			<div className="flex flex-col items-center gap-4 p-16 md:gap-16">
				<div>
					<h1 className='text-center pt-10'>Create Your Account!</h1>
					<h2 className='text-center m-2 text-2xl'>All fields are required</h2>
				</div>

				<form action="">
					<fieldset className="grid grid-rows-2 gap-10 justify-items-center">
						<div className="flex flex-col gap-2 col-span-1">
							<label htmlFor="name" >Full Name:</label>
							<input className="w-80 rounded" type="text" id="name" value={name} readOnly required/>

							<label htmlFor="email" >Email:</label>
							<input className="w-80 rounded" type="email" id="email" value={email} readOnly required/>

							<label htmlFor="description">About You:</label>
							<textarea className="w-80 rounded" name="description" id="description"></textarea>
						</div>

						<div className="flex flex-col gap-2 col-start-2 col-end-3">
							<label htmlFor="smallPicture">Small Profile Picture:</label>
							<input className="w-80 rounded" type="text" id="smallPicture" required/>

							<label htmlFor="mediumPicture">Medium Profile Picture:</label>
							<input className="w-80 rounded" type="text" id="mediumPicture" required/>

							<label htmlFor="bigPicture" >Large Profile Picture:</label>
							<input className="w-80 rounded" type="text" id="bigPicture" value={pictures.big} readOnly required/>
						</div>

						<button className="col-start-1 col-end-3 border border-gray-500 border-solid p-2 h-fit w-fit rounded" type="submit">Create Account!</button>
					</fieldset>
				</form>
			</div>
		</>
	)
}