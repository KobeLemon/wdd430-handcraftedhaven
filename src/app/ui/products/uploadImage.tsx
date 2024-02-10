'use client'
import React, { useState } from 'react';
import Image from "next/image";
import { Artisan } from "@/app/lib/definitions";

export default function UploadImage({id}:{id:number}){
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
        const input : HTMLInputElement | null = document.getElementById('uploaded-image') as HTMLInputElement;
        const image : File | undefined = input?.files?.[0];
        const imageType = input.value.split('.')[input.value.split('.').length-1]

        let imageURL = null;
        console.log(image)
        try {

            const result = await fetch('/api/products/imageUpload', {
				method: 'POST',
				body: image,
                headers: {
                    'Content-Type': `image/${imageType}`, // Set the Content-Type header to image/*
                },
			})
            console.log(result)
            imageURL = await result.text()
        } catch (error:any) {
            setUploadError(error.message);
        }
        try {
            const result = await fetch('/api/user/updateImage', {
                method: 'POST',
                body: JSON.stringify({url:imageURL, id}),
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
        <>
            <input id='uploaded-image' type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload} disabled={!selectedImage || isLoading}>
                {isLoading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadError && <div>{uploadError}</div>}
            {uploadedImageUrl && (
                <div className="h-20" >
                <img src={uploadedImageUrl} alt="Uploaded" className='absolute z-20' />
                </div>
            )}
        </>
    )
}