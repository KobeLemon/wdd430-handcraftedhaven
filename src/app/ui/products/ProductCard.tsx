import Link from "next/link";
import Image from "next/image";
import StarsRating from "./StarsRating";
import { Product } from "@/app/lib/definitions";


export default function ProductCard({ id, name, category, price, description, collection, pictures, rating } : Product) {

  return (

    <Link className="flex flex-col items-start justify-center w-full md:w-auto" href={`/products/${id}`}>

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

  )

}