import { StarIcon } from "@heroicons/react/16/solid";

export default function StarsRating( { rating } : { rating: number | undefined } ) {

  return (

    <div className='w-min flex'>

      {

        Array(5).fill(1).map( ( _, index ) => {

          return (
          
            <StarIcon 
            
              key={index} 
          
              className={`h-4 w-4 ${rating ? index < rating ? 'text-[#ffdf00]' : '' : ''}`} 
        
            />

          )

        } )
      }

    </div>

  )

} 