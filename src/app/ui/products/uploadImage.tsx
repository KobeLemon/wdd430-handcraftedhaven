'use client'
import React, { useState } from 'react';
import Image from "next/image";
import { Artisan } from "@/app/lib/definitions";

export default function UploadImage({id, required}:{id:string, required:Boolean}){
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadError, setUploadError] = useState();

    const handleImageChange = (event:any) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };
    return (
        <>
            {required && <input name='image' id='uploaded-image' type="file" accept="image/*" onChange={handleImageChange} required/>}
            {!required && <input name='image' id='uploaded-image' type="file" accept="image/*" onChange={handleImageChange}/>}
        </>
    )
}