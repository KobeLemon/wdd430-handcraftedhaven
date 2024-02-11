'use client'
import './custom.css'
import Image from "next/image";
import { Artisan } from "@/app/lib/definitions";
import ProfileInput from './profileInput'
import { useState } from 'react';
import ChangeImageContainer from './changeImageContainer';
import CreateProduct from '../products/createProduct';

export default function ArtisanProfileEdit({id, name, description, pictures} : Artisan) {

	const [showImageContainer, setShowImageContainer] = useState(false)

	const [imageData, setImageData] = useState({
		small:pictures.small,
		medium:pictures.medium,
		big:pictures.big
	})

	const [formData, setFormData] = useState({
		name:name,
		description:description,
		id:id,
		picture:imageData.big,
	})

	const handleChange = (e:any) => {
		const { name, value } = e.target;
		setFormData({
		  ...formData,
		  [name]: value,
		});
	  };

	const onSubmitForm = async(e:any) =>{
		e.preventDefault();
		try {
			console.log(formData)
			const result = await fetch('/api/user/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData)
			})
			console.log(result)
		} catch(error){

		}
	}
	const handleShowImageContainer = (e:any) => {
		console.log('sdsd')
		setShowImageContainer(!showImageContainer)
		console.log(showImageContainer)
	  };


	return (
		<>
			{showImageContainer == true && <ChangeImageContainer id={parseInt(id)} handler={handleShowImageContainer} />}
			<form className="p-5 sm:p-10"
			onSubmit={onSubmitForm}>

				<div className='sm:flex gap-x-10 mb-10'>

					<div className="w-fit mb-8 sm:mb-0">
						<div className='relative w-[200px] h-[200px] mb-2 rounded-full overflow-hidden'>
							<Image
								className="object-cover"
								src={formData.picture}
								alt={`${name}'s Avatar`}
								fill
							/>
						</div>
						<div className='text-center'>
							<button type='button' className='border-b-2 border-b-transparent hover:border-b-orange'
							onClick={handleShowImageContainer}>Change Image</button>
						</div>
						
					</div>

					<div className="flex-1 py-4">

						<h3 className='mb-2 h5'>Name</h3>
						<input name='name' value={formData.name} onChange={handleChange}
						className="w-full mb-6 text-base text-center md:text-left focus:ring-orange focus:border-orange"/>

						<h4 className='mb-2 h5'>Description</h4>
						<input name='description' value={formData.description} onChange={handleChange}
						className="w-full mb-4 text-base text-center md:text-left focus:ring-orange focus:border-orange"
						/>

					</div>					

				</div>

				<div className='text-center'>

					<input hidden name='id' defaultValue={id}/>
					<input hidden name='picture' defaultValue={pictures.big}/>
					<div className="w-full">
						<button type='submit' className='px-8 py-2 bg-[#15803d] text-white font-bold rounded-md'
						>Save Profile</button>
					</div>
				
				</div>

			</form>
		</>
	)
}