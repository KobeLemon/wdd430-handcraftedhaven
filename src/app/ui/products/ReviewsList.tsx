import ReviewCard from "./ReviewCard";
import { Review } from "@/app/lib/test-definitions";

export default function ReviewsList( { list } : { list: Review[] } ) {

  return (

    <div className="max-w-96">

      {

        list.map( ( reviewData ) => {

          return (

            <ReviewCard
            
              key={reviewData.id}
              
              date={reviewData.date} 
              
              name={reviewData.name} 
              
              review={reviewData.review} 
              
            />

          )

        } )

      }

    </div>

  )

}

