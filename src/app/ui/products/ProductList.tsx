import ProductCard, { Product } from "./ProductCard"


export default function ProductList({ products } : { products: Product[]}) {

  return (

    <div className="w-full flex flex-wrap gap-5">
  
      {

        products.map( (product : Product) => (

          <ProductCard

            key={product.id}
            
            id={product.id} 
            
            name={product.name} 
            
            category={product.category} 
            
            price={product.price} 

            rating={product.rating}
            
            imageURL={product.imageURL} 
            
          />

        ) )
        
      }

    </div>

  )

}