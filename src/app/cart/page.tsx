'use client'

import { Metadata } from 'next';
import { JSX, SVGProps } from 'react';
import Image from 'next/image';
import thumbnail from '../../../../public/thumbnails/art-1.jpg';
import React, { useState, useEffect } from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';


interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }
export function CartPage(){
      
    const [cart, setCart] = useState<Product[]>([
        
    ]);
  
    // useEffect(() => {
    //   fetch('/api/products')
    //     .then((res) => res.json())
    //     .then((data) => setProducts(data));
    // }, []);
  
    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCart(savedCart);
    }, []);
  
    useEffect(() => {
        setCart((prevCart) => {
          localStorage.setItem('cart', JSON.stringify(prevCart));
          return prevCart;
        });
      }, [cart]);
  
    const removeFromCart = (productId: number) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };
  
    const updateQuantity = (productId: number, action: 'add' | 'subtract') => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: action === 'add' ? item.quantity + 1 : item.quantity > 0 ? item.quantity - 1 : 0 }
            : item,
        )
        
      );
      console.log(action)

    };
  
    return (
      <div>
          {cart.map((product) => (
            <div>
                <CartItem product={product} updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>
                <hr />
            </div>
            
          ))}
        </div>
    );
  };

export default function Page() {
  return (
    <div className="flex flex-col w-full lg:flex-row gap-6 lg:gap-12 px-4 md:px-6 py-6 md:py-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <div className="border rounded-lg overflow-hidden wfull">
        <CartPage/>
        </div>
        
    </div>
    </div>
)
}

interface CartItemProps {
    updateQuantity: (productId: number, action: 'add' | 'subtract') => void;
    removeFromCart: (productId: number) => void;
  }
  
interface CartItemComponentProps {
    product: Product;
    updateQuantity: CartItemProps['updateQuantity'];
    removeFromCart: CartItemProps['removeFromCart'];
}
  
export function CartItem({ product, updateQuantity, removeFromCart }: CartItemComponentProps) {
    return (
        <div key={product.id} className='flex w-full items-center justify-around my-10'>
                <h6 className='m-0'>{product.name}</h6>
                <p>${product.price}</p>
                <div className='flex bg-light-grayish-blue'>

                    <button className='p-2 text-xl font-bold rounded-tl-md rounded-bl-md hover:bg-grayish-blue' type='button' onClick={() => updateQuantity(product.id, "subtract")}>

                        <MinusIcon className='w-5 h-5 font-bold text-orange pointer-events-none' />

                    </button>

                    <div className='p-2'>

                        <span className='flex justify-center items-center font-bold h-6 w-6'>

                        { product.quantity }

                        </span>

                    </div>

                    <button className='p-2 text-2xl font-bold rounded-tr-md rounded-br-md hover:bg-grayish-blue' type='button' onClick={() => updateQuantity(product.id, "add")}>

                        <PlusIcon className='w-5 h-5 font-bold text-orange pointer-events-none' />

                    </button>
                </div>
            <button onClick={() => removeFromCart(product.id)} className='w-6'><TrashIcon/></button>
            </div> 
    )
}