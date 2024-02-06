
import StarsRating from "./StarsRating"

export default function ReviewCard( { name, description, rating } : { name: string, description: string, rating: number }) {

  return (

    <div className='mb-5'>

      <div>

        {/* <span className='text-[10px] text-dark-grayish-blue'>

          '01-25-2024'

        </span> */}

        <h3 className='h6 mb-1'>

          {name}

        </h3>

      </div>

      <p className='mb-1'>

        {description}

      </p>

      <StarsRating rating={rating} />

    </div>

  )

}