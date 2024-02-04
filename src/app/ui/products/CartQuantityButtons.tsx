'use client';

import { useState, useEffect } from 'react';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import { useParams } from 'next/navigation';

type CartProduct = {

  id: number,

  title: string,

  image: string,

  price: number

}

export default function CartQuantityButtons() {

  const { id } = useParams<{ id: string }>();

  const [ product, setProduct ] = useState<null | CartProduct>( null );

  const [ quantity, setQuantity ] = useState<number>( 0 );

  const onDecreaseClickHandler = () => setQuantity( previousQuantity => previousQuantity > 0 ? --previousQuantity : 0 );

  const onIncreaseClickHandler = () => setQuantity( previousQuantity => ++previousQuantity );

  useEffect( () => {

    const fetchProductData = async () => {

      const res = await fetch( `https://fakestoreapi.com/products/${id}` );
      
      const data = await res.json();
  
      setProduct( {

        id: data.id,

        title: data.title,

        image: data.image,

        price: data.price

      } );

    }
    
    fetchProductData();

  }, [] );

  const addToCartClickHandler = () => {

    if ( quantity == 0 ) return;

    // console.log( 'add to cart', id );

  }

  return (

    <div className='flex justify-between items-stretch flex-wrap gap-5 max-w-96'>

      <div className='flex bg-light-grayish-blue'>

        <button className='p-2 text-xl font-bold rounded-tl-md rounded-bl-md hover:bg-grayish-blue' type='button' onClick={onDecreaseClickHandler}>

          <MinusIcon className='w-5 h-5 font-bold text-orange pointer-events-none' />

        </button>

        <div className='p-2'>

          <span className='flex justify-center items-center font-bold h-6 w-6'>

            { quantity }

          </span>

        </div>

        <button className='p-2 text-2xl font-bold rounded-tr-md rounded-br-md hover:bg-grayish-blue' type='button' onClick={onIncreaseClickHandler}>

          <PlusIcon className='w-5 h-5 font-bold text-orange pointer-events-none' />

        </button>

      </div>

      <div>

        <Button
          
          text='Add To Cart'

          disabled={ ! quantity }

          onClickHandler={addToCartClickHandler}
        
        >

          <ShoppingCartIcon className='w-5 h-5 mr-2' />

        </Button>

      </div>

     </div>

  )

}