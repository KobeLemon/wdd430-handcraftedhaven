import Link from "next/link";

export default function CategoryCard( {

  id,
  
  categoryTitle,

  // params

} : {

  id: number,
  
  categoryTitle: string

  // params: { category: string }

} ) {

  return (

    <Link className='flex justify-center items-center px-10 flex-1 basis-60 h-80 rounded-lg bg-orange' href={`/categories/${id}`}>

      <div className='text-4xl font-bold text-center text-white'>
                
        {categoryTitle}
        
      </div>

    </Link>

  )

}