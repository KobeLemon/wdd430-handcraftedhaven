'use client';

import ProductList from '../ui/products/ProductList';
import { ChangeEvent, Suspense, useEffect, useState } from 'react';
import { Category, Product } from '../lib/definitions';
import { useDebouncedCallback } from 'use-debounce';

type FiltersState = {
  rating: number;
  minPrice: number;
  maxPrice: number;
  category: string;
}

export default function Page() {

  const [isProductLoading, setIsProductLoading] = useState( true );

  const [products, setProducts] = useState([] as Product[]);

  const [categories, setCategories] = useState([] as Category[]);

  const [filteredProducts, setFilteredProducts] = useState([] as Product[]);

  const [filters, setFilters] = useState({} as FiltersState);
  
  const selectChangeHandler = useDebouncedCallback(
    (event: ChangeEvent) => {
      const target = event.target as HTMLInputElement;
      const inputNameAttribute = target.getAttribute('name') as string;
      const inputValue = target.value;

      setFilters((prevState) => ({
        ...prevState,
        [inputNameAttribute]:
          !!inputNameAttribute && inputNameAttribute.toLocaleLowerCase() !== 'category'
            ? Number(inputValue)
            : inputValue,
      }));

      console.log(filters, 'after update');
    },
    300
  );

  useEffect(() => {

    const fetchProductsAndCategories = async () => {

      const productsRequest = await fetch( 'api/products' );

      const categoriesRequest = await fetch( 'api/categories' );

      const productsResponse = await productsRequest.json();

      const categoriesResponse = await categoriesRequest.json();

      setProducts( productsResponse as Product[] );

      setFilteredProducts( productsResponse as Product[] );

      setCategories( categoriesResponse as Category[] );

      setIsProductLoading( false );

      // const requests = [ 'api/products', 'api/categories' ].map( url => fetch( url ) );

      // const responses =  await Promise.all( requests );

      // responses.map( async ( response, index ) => {

      //   const data = await response.json();

      //   if ( index === 0  ) setProducts( data as Product[] );

      //   if ( index === 1  ) setCategories( data as Category[] );
      
      // } );

    }



    fetchProductsAndCategories();

  },[]);

  useEffect(() => {

    const results = products.filter( ( { rating, price, category } ) => {

      return ( filters.rating ? filters.rating === rating : true )
      
      &&

      ( filters.minPrice ? filters.minPrice <= +price : true )

      &&

      ( filters.maxPrice ? filters.maxPrice >= +price : true )

      &&

      ( filters.category ? filters.category.toLocaleLowerCase() === category.toLocaleLowerCase() : true )

    } );

    setFilteredProducts( results );

  }, [filters, products]);

  return (

    <main className='p-8 sm:p-10'>

      <h1>Products</h1>

      <section>
        
        <div className='flex flex-wrap gap-4 mb-10'>

          <label>
            <select className='focus:ring-orange focus:border-orange' name="rating" id="rating" onChange={selectChangeHandler}>
              <option value="">Select Rating</option>
                {
                  Array( 5 )
                  
                    .fill( null )
                    
                    .map( (_, index) => ( <option key={index} value={index+1}>{index+1}</option> ) )
                }
              </select>
          
          </label>

          <label>
            <select className='focus:ring-orange focus:border-orange' name="category" id="category" onChange={selectChangeHandler}>
              <option value="">Select Category</option>
              {
                categories
                  
                  .map( ({ id, name }) => ( <option className='lowercase' key={id} value={name}>{name}</option> ) )
              }
            </select>
          </label>

          <label>
            <input className='focus:ring-orange focus:border-orange' name="minPrice" type="number" placeholder='Min Price' min={0} onChange={selectChangeHandler} />
          </label>

          <label>
            <input className='focus:ring-orange focus:border-orange' name="maxPrice" type="number" placeholder='Max Price' min={0} onChange={selectChangeHandler} />
          </label>



        </div>

        <div>

          {
            isProductLoading ?

              <p className='h5 pt-10'>Loading...</p>

              :

              !! filteredProducts.length ?

                <ProductList products={filteredProducts} />

                :

                <p className='h5 pt-10'>No product found, adjust your filters</p>
            
          }

        </div>

      </section>

    </main>

  );

}