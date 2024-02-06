import CategoryCard from "./CategoryCard";
import { Category } from "@/app/lib/definitions";

export default function CategoryList({ categories } : { categories: Category[]}) {

  return (

    <div className="flex flex-wrap gap-10">

      {
       
        categories.map( ( category ) => (

          <CategoryCard 
          
            key={category.id}

            id={category.id}
            
            name={category.name}
          
          />

        ) )

      }

    </div>

  )

}