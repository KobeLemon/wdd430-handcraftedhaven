import { Category, Product } from "@/app/lib/definitions";
import ProductCardEdit from "./ProductCardEdit";


export default function ProductListEdit({ products, categories } : { products: Array<Product>, categories:Array<Category>}) {
  console.log()
  return (

    <div className="w-full flex flex-wrap gap-5 justify-evenly">

      {

        products.map( (product : Product) => {
          console.log(product.category)

          return (<ProductCardEdit

            key={product.id}

            id={product.id}

            name={product.name}

            description={product.description}

            collection={product.collection}

            category={product.category}

            price={product.price}

            rating={product.rating}

            pictures={product.pictures}

            categories={categories}

          />

        ) })

      }

    </div>

  )

}