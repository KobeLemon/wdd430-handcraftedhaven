import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/16/solid";
import { Product } from "@/app/lib/test-definitions";



export default function ProductCard({ id, title, category, price, description, image, rating } : Product) {

  return (

    <Link className="flex-1" href={`/products/${id}`}>

      <div className='relative h-48 aspect-square sm:aspect-video'>

        <Image 

          className='object-contain'
        
          src={image} 
          
          alt='' 
          
          fill

          sizes="(max-width: 640px) 192vw, 341vw"
          
        />

      </div>

      <div className='py-4'>

        <div className='w-min flex'>
          {

            Array(5).fill(1).map( ( item, index ) => {

              return (
              
                <StarIcon 
                
                  key={index} 
              
                  className={`h-4 w-4 ${index < rating ? 'text-[#ffdf00]' : ''}`} 
            
                />

              )

            } )
          }
        </div>
        <div className='text-lg'>{title}</div>
        <div className='text-dark-grayish-blue mb-2'>{category}</div>
        <div className='font-bold'>$ {price}</div>

      </div>

    </Link>

  )

}