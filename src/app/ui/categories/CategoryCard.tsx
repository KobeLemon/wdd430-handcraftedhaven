import Link from "next/link";

export default function CategoryCard( {

  id,
  
  name

} : {

  id: number,
  
  name: string

} ) {

  return (

    <Link className='flex justify-center items-center px-10 flex-1 basis-60 h-80 rounded-lg bg-orange' href={`/categories/${id}?name=${encodeURIComponent(name.toLocaleLowerCase())}`}>

      <div className='text-4xl font-bold text-center text-black'>
                
        {name}
        
      </div>

    </Link>

  )

}