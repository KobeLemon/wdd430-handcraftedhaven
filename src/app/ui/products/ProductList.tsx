import ProductCard from "./ProductCard";
import { Product } from "@/app/lib/definitions";


export default function ProductList({ products } : { products: Product[]}) {

  return (

    <div className="w-full flex flex-wrap gap-5 justify-evenly">

      {

        products.map( (product : Product) => (

          <ProductCard

            key={product.id}

            id={product.id}

            name={product.name}

            description={product.description}

            collection={product.collection}

            category={product.category}

            price={product.price}

            rating={product.rating}

            pictures={product.pictures}

						category_name=""

						artisan_name=""

          />

        ) )

      }

    </div>

  )

}