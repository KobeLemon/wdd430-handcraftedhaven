'use client';

import { useState, useEffect, ReactEventHandler } from 'react';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import { useParams } from 'next/navigation';
import { json } from 'stream/consumers';
import { useShoppingCart } from '../header/shopping-cart';
import { toast } from 'sonner';


type CartProduct = {

  id: string;

  name: string;

  price: number;

  quantity: number;

  image: string;

}

function storeProduct( products: CartProduct[] ) {

  localStorage.setItem( 'cart', JSON.stringify( products ) );

}

function getTotalCartQuantity(){
  const cartItems: CartProduct[] | null = JSON.parse(localStorage.getItem('cart') || 'null');

  const totalQuantity = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  return totalQuantity

}

export default function CartQuantityButtons() {

  const { id } = useParams<{ id: string }>();

  const [ product, setProduct ] = useState<null | CartProduct>( null );

  const [ quantity, setQuantity ] = useState<number>( 0 );

  const onDecreaseClickHandler = () => setQuantity( previousQuantity => previousQuantity > 0 ? --previousQuantity : 0 );

  const onIncreaseClickHandler = () => setQuantity( previousQuantity => ++previousQuantity );

  useEffect( () => {

    const fetchProductData = async () => {

      const res = await fetch( `/api/products?id=${id}` );

      const data = await res.json();

      console.log( data, 'fetching data' );

      if ( product ) return;

      setProduct( {

        id: data.id,

        name: data.name,

        price: data.price,

        image: data.pictures.small,

        quantity: 0

      } );

    }

    fetchProductData();

  }, [] );
  const { setCartQuantity } = useShoppingCart();

  const addToCartClickHandler = () => {
    if (quantity === 0) return;

    let cartItems: CartProduct[] | string | null = localStorage.getItem('cart');

    if (!cartItems) {
      let updatedCart = [{ ...product, quantity }] as CartProduct[];
      storeProduct(updatedCart);

      setCartQuantity(getTotalCartQuantity())
    } else {
      cartItems = JSON.parse(cartItems) as CartProduct[];

      const isProductInCart = cartItems.find((cartItem: CartProduct) => cartItem.id === product?.id);

      if (isProductInCart) {
        let updatedCart = cartItems.map((cartItem) =>
          cartItem.id === product?.id ? { ...cartItem, quantity } : cartItem
        );
        storeProduct(updatedCart);
      setCartQuantity(getTotalCartQuantity())

      } else {
        let updatedCart = [...cartItems, { ...product, quantity }] as CartProduct[];
        storeProduct(updatedCart);
      setCartQuantity(getTotalCartQuantity())

      }
    }
    toast.success('Item added to the cart', {
      position: 'top-center'
    })
  };

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