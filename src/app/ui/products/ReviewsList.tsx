import Review from "./Review"


export default function ReviewsList( { list } : { list: Object[] } ) {

  return (

    <div className="max-w-96">

      {

        list.map( ({ date, fullName, review }) => {

          return (

            <Review 
              
              date={date} 
              
              fullName={fullName} 
              
              review={review} 
              
            />

          )

        } )

      }

    </div>

  )

} 