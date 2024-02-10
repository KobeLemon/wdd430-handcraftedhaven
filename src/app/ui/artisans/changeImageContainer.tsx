'use client'
import './custom.css'
import React, { useState } from 'react';
import Image from "next/image";
import { Artisan } from "@/app/lib/definitions";
import ProfileInput from './profileInput'
import Error from 'next/error';

export default function ChangeImageContainer({id}:{id:number}){
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadError, setUploadError] = useState();
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const handleImageChange = (event:any) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleUpload = async () => {
        setIsLoading(true);
        const input : HTMLInputElement | null = document.getElementById('uploaded-image') as HTMLInputElement | null;
        const image : File | undefined = input?.files?.[0];
        const imageType = input?.value.split('.')?.[input?.value.split('.').length-1]

        let imageURL = null;
        console.log(image)
        try {

            const result = await fetch('/api/user/imageUpload', {
				method: 'POST',
				body: image,
                headers: {
                    'Content-Type': `image/${imageType}`, // Set the Content-Type header to image/*
                },
			})
            console.log(result)
            imageURL = await result.text()
        } catch (error: any) {
            setUploadError(error.message);
        }
        try {
            const result = await fetch('/api/user/updateImage', {
                method: 'POST',
                body: JSON.stringify({url:imageURL, id:id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(result)
        } catch(error) {
            console.error('Was unable to change image.')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='absolute flex flex-col left-1/4 top-1/4 w-1/2 h-1/2 z-10 bg-grayish-blue artisan-change-image-container'>
            <input id='uploaded-image' type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload} disabled={!selectedImage || isLoading}>
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadError && <div>{uploadError}</div>}
            {uploadedImageUrl && (
                <div>
                <img src={uploadedImageUrl} alt="Uploaded" className='absolute z-20' />
                </div>
            )}
        </div>
    )
}