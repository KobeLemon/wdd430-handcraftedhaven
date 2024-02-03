import ProductCard from "./ProductCard"
import { Product } from "@/app/lib/test-definitions"


export default function ProductList({ products } : { products: Product[]}) {

  return (

    <div className="w-full flex flex-wrap gap-5">
  
      {

        products.map( (product : Product) => (

          <ProductCard

            key={product.id}
            
            id={product.id} 
            
            title={product.title}
            
            category={product.category} 
            
            price={product.price} 

            rating={Math.ceil(product.rating?.rate)}
            
            image={product.image} 
            
          />

        ) )
        
      }

    </div>

  )

}