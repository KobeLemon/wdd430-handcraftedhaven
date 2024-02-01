import Review from "./Review"


export default function ReviewsList( { list } : { list: Object[] } ) {

  return (

    <div className="max-w-96">

      {

        list.map( ({ id, date, fullName, review } : { id: number, date: Date, fullName: string, review: string } ) => {

          return (

            <Review
            
              key={id}
              
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

