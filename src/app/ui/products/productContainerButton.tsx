'use client'
import { MouseEventHandler, useState } from "react";
import CreateProduct from "./createProduct";
import { Category } from "@/app/lib/definitions";



export default function CreateProductButton({id, categories}:{id:number, categories:Array<Category>}){

    const [showProductContainer, setShowProductContainer] = useState(false)

    const handleShowProductContainer = (e:any) => {
		setShowProductContainer(!showProductContainer)
		console.log(showProductContainer)
	  };

    return (
        <>
        <button className='flex artisan-edit-button mx-auto'
		onClick={handleShowProductContainer}>New Product +</button>
        {showProductContainer && <CreateProduct id={id} toggle={handleShowProductContainer} categories={categories}/>}
        </>
    )
}