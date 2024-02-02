import ProductCard, { Product } from "./ProductCard"


export default function ProductList({ productList } : Product[]) {

  return (

    <div className="w-full flex flex-wrap gap-5">
  
      {

        productList.map( (product : Product) => (

          <ProductCard
            
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