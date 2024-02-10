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
			{showImageContainer == true && <ChangeImageContainer id={parseInt(id)} />}
			<form className="flex flex-col flex-wrap items-center gap-4 p-16 md:flex-row md:gap-16"
			onSubmit={onSubmitForm}>

				<div className="relative aspect-video md:aspect-square">
					<button type='button' className='flex artisan-edit-button mx-auto'
					onClick={handleShowImageContainer}>Change Image</button>
					<Image
						className="object-cover rounded-full"
						src={formData.picture}
						alt={`${name}'s Avatar`}
						width={200}
						height={200}
					/>
				</div>

				<div className="py-4">
					<h3>Name</h3>
					<input name='name' value={formData.name} onChange={handleChange}
					className="text-3xl text-center mb-1 md:text-4xl md:text-left artisan-input-edit"/>

					<h4>Description</h4>
					<input name='description' value={formData.description} onChange={handleChange}
					className="text-center md:text-left artisan-input-edit"
					/>
				</div>
				<input hidden name='id' defaultValue={id}/>
				<input hidden name='picture' defaultValue={pictures.big}/>
				<div className="w-full">
					<button type='submit' className='flex artisan-edit-button mx-auto'
					>Save Profile</button>
				</div>
			</form>
		</>
	)
}