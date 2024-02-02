import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/16/solid";

export interface Product {
  id: string,
  name: string,
  category: string,
  description: string,
  price: number,
  rating: number,
  imageURL: string
}

export default function ProductCard({ id, name, category, price, imageURL, rating, } : Product) {

  return (

    <Link className="flex-1" href={`/products/${id}`}>

      <div className='relative h-48 aspect-square sm:aspect-video'>

        <Image 

          className='object-cover'
        
          src={imageURL} 
          
          alt='' 
          
          fill
          
        />

      </div>

      <div className='py-4'>

        <div className='w-min flex'>
          {

            Array(5).fill(1).map( ( item, index ) => {

              return (
              
                <StarIcon 
                
                  key={index} 
              
                  className={`h-4 w-4 ${index < rating ? 'text-[#FFDF00]' : ''}`} 
            
                />

              )

            } )
          }
        </div>
        <div className='text-lg'>{name}</div>
        <div className='text-dark-grayish-blue mb-2'>{category}</div>
        <div className='font-bold'>$ {price}</div>

      </div>

    </Link>

  )

}