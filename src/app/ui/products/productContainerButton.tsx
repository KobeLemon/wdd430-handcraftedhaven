'use client'
import { MouseEventHandler, useState } from "react";
import CreateProduct from "./createProduct";
import { Category } from "@/app/lib/definitions";



export default function CreateProductButton({id, collection, categories}:{id:string, collection:string, categories:Array<Category>}){

    const [showProductContainer, setShowProductContainer] = useState(false)

    const handleShowProductContainer = (e:any) => {
		setShowProductContainer(!showProductContainer)
		console.log(showProductContainer)
	  };

    return (
        <div className="mb-10 text-right">
            <button className='px-8 py-2 bg-orange text-black font-bold rounded-md'
            onClick={handleShowProductContainer}>Add Product</button>
            {showProductContainer && <CreateProduct id={id} collection={collection} toggle={handleShowProductContainer} categories={categories}/>}
        </div>
    )
}