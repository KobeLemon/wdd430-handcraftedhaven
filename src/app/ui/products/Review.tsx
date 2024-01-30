
export default function Review( { date, fullName, review } : { date: Date, fullName: string, review: string }) {

  return (

    <div className='flex gap-x-3 mb-5'>
      
      <div>
      
        <div className='w-16 h-16 rounded-full bg-orange'></div>

      </div>

      <div>

        <div>

          <span className='text-[10px] text-dark-grayish-blue'>

            {date}

          </span>

          <h3 className='h6 mb-1'>

            {fullName}

          </h3>

        </div>

        <p>

          {review}

        </p>

      </div>

    </div>

  )

}