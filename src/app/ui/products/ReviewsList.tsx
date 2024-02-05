import ReviewCard from "./ReviewCard";
import { Review } from "@/app/lib/definitions";

export default function ReviewsList( { reviews } : { reviews: Review[] } ) {

  return (

    <div className="max-w-96">

      {

        reviews.map( ( review ) => {

          return (

            <ReviewCard
            
              key={review.id}
              
              name={review.name} 
              
              description={review.description}

              rating={review.rating}
              
            />

          )

        } )

      }

    </div>

  )

}

