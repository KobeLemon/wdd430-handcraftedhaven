'use client'
import '../../ui/artisans/custom.css'
import Link from "next/link";
import Image from "next/image";
import StarsRating from "./StarsRating";
import { Category, Product } from "@/app/lib/definitions";
import { useState } from 'react';
import EditProduct from './editProduct';


export default function ProductCardEdit({id, name, category, price, description, collection, pictures, rating , categories}:
  {id:string, name:string, category:string, price:string, description:string, collection:string, pictures:any, rating:number, categories:Array<Category>}) {

  const [showEditProduct, setEditProduct] = useState(false);

  const handleShowProduct = (e:any) =>{
    setEditProduct(!showEditProduct)
  }



  return (
    <>
    {showEditProduct && <EditProduct id={id} name={name} category={category}
    price={price} description={description} collection={collection} pictures={pictures} toggle={handleShowProduct} categories={categories}/>}
    <div className="relative flex flex-col items-start justify-center md:w-auto">
      <Link href={`/products/${id}`}>

        <div className='relative h-48 aspect-square sm:aspect-video'>

          <Image 

            className='object-cover'
          
            src={pictures.small} 
            
            alt='' 
            
            fill

            sizes="(max-width: 640px) 192vw, 341vw"
            
          />

        </div>

        <div className='py-4'>

          <StarsRating rating={rating} />
          
          <div className='text-lg'>{name}</div>

          <div className='text-dark-grayish-blue mb-2'>{category}</div>

          <div className='font-bold'>$ {price}</div>

        </div>

      </Link>

      <button className='absolute right-5 bottom-4 w-20 h-10 font-bold bg-pale-orange hover:bg-orange' onClick={handleShowProduct}>Edit</button>

    </div>
    </>

  )

}