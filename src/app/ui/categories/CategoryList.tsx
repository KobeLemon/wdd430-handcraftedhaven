import CategoryCard from "./CategoryCard"

export default function CategoryList({ categories } : { categories: string[]}) {

  return (

    <div className="flex flex-wrap gap-10">

      {
       
        categories.map( ( category, index ) => (

          <CategoryCard 
          
            key={index}

            id={index+1}
            
            categoryTitle={category}
          
          />

        ) )

      }

    </div>

  )

}