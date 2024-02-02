import Review, { ReviewType } from "./Review";

export default function ReviewsList( { list } : { list: ReviewType[] } ) {

  return (

    <div className="max-w-96">

      {

        list.map( ( reviewData ) => {

          return (

            <Review
            
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

