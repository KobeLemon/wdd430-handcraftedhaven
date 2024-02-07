'use client'

import Image, { StaticImageData } from 'next/image';
// import thumbnail from '../../../public/thumbnails/art-1.jpg';
import React, { useState, useEffect } from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useShoppingCart } from '../ui/header/shopping-cart';
  


interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string
}

function getTotalCartQuantity(cart: Product[]){
    const cartItems = cart
  
    const totalQuantity = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  
    return totalQuantity
  
  }


function CartPage(){
    const { setCartQuantity } = useShoppingCart();
      
    const [cart, setCart] = useState([] as Product[]);

    useEffect(() => {

        setCart(() => {
            const cartFromStorage = localStorage.getItem("cart")
            if (cartFromStorage) return JSON.parse(cartFromStorage) as Product[]
            return [] as Product[]
        } );

    },[])
  
    useEffect(() => {
        setCart((prevCart) => {
            localStorage.setItem('cart', JSON.stringify(prevCart));
            return prevCart;
        });
    }, [cart]);
  
    const removeFromCart = (productId: string) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };
  
    

    const updateQuantity = (productId: string, action: 'add' | 'subtract') => {
        setCart((prevCart) => {
          const updatedCart = prevCart.map((item) =>
            item.id === productId
              ? { ...item, quantity: action === 'add' ? item.quantity + 1 : item.quantity > 0 ? item.quantity - 1 : 0 }
              : item,
          );
          const filteredCart = updatedCart.filter((item) => item.quantity > 0);
          return filteredCart;
        });
      };
      
      useEffect(() => {
        setCartQuantity(getTotalCartQuantity(cart));
      }, [cart]); 



     
    return (
      <div className='relative w-full overflow-auto'>
        {cart.length > 0 ? (
            <table className='w-full caption-bottom text-sm border-2 border-light-grayish-blue shadow-2xl'>
            <thead className='border-b-2 border-light-grayish-blue'>
                <tr className='flex justify-between my-3'>
                    <th className='h-12 px-2 md:px-4 text-left align-middle font-medium text-muted-foreground md:w-56 lg:text-lg [&:has([role=checkbox])]:pr-0'>Product Details</th>
                    <th className='h-12 px-2 md:px-4 text-left align-middle font-medium text-muted-foreground lg:text-lg [&:has([role=checkbox])]:pr-0'>Price</th>
                    <th className='h-12 px-2 md:px-4 text-left align-middle font-medium text-muted-foreground lg:text-lg [&:has([role=checkbox])]:pr-0'>Quantity</th>
                    <th className='h-12 px-2 md:px-4 text-left align-middle font-medium text-muted-foreground lg:text-lg [&:has([role=checkbox])]:pr-0'>Total</th>
                    <th className='h-12 px-2 md:px-4 text-left align-middle font-medium text-muted-foreground w-12 md:w-24 lg:text-lg [&:has([role=checkbox])]:pr-0'></th>
                </tr>
            </thead>
           <tbody className='flex flex-col w-full'>
                {cart.map((product) => (
                    <CartItem key={product.id} product={product} updateQuantity={updateQuantity} removeFromCart={removeFromCart}/>))}
           
           </tbody>
        </table>
        ) : (
            <p className="text-center text-lg mt-4">Cart is empty</p>
        )}
        </div>
    );
  };

  interface CartItemProps {
    updateQuantity: (productId: string, action: 'add' | 'subtract') => void;
    removeFromCart: (productId: string) => void;
  }
  
interface CartItemComponentProps {
    product: Product;
    updateQuantity: CartItemProps['updateQuantity'];
    removeFromCart: CartItemProps['removeFromCart'];
}
  
function CartItem({ product, updateQuantity, removeFromCart }: CartItemComponentProps) {
    return (
        <tr className='flex w-full items-center justify-between py-4 border-b-2 border-light-grayish-blue '>
            <td className='px-2 md:px-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium'>
                <Link href={`/products/${product.id}`} className='flex items-center justify-around '>
                    <Image src={product.image} width={80} height={80} alt={`product image of ${product.name}`} className='w-16 h-16 min-w-14 rounded-lg object-cover overflow-hidden me-2 md:me-3 md:w-24 md:h-24'/>
                    <h6 className='m-0 text-xs md:text-base lg:text-lg'>{product.name}</h6>
                </Link>
            </td>
                
                <td className='px-2 md:px-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium'>
                    <p className='text-sm md:text-base lg:text-lg'>${product.price}</p>
                </td>
                <td className='px-2 md:px-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium'>
                    <div className='flex bg-light-grayish-blue'>
                        <button className='p-1 text-xl font-bold rounded-tl-md rounded-bl-md hover:bg-grayish-blue md:p-2' type='button' onClick={() => updateQuantity(product.id, "subtract")}>
                            <MinusIcon className='w-3 h-3 md:w-5 md:h-5 font-bold text-orange pointer-events-none' />
                        </button>
                        <div className='p-1 flex items-center justify-center md:px-3'>
                            <p className='m-0 font-bold text-xs text-center md:text-base'>
                                { product.quantity }
                            </p>
                        </div>
                        <button className='p-1 text-2xl font-bold rounded-tr-md rounded-br-md hover:bg-grayish-blue md:p-2' type='button' onClick={() => updateQuantity(product.id, "add")}>
                            <PlusIcon className='w-3 h-3 md:w-5 md:h-5 font-bold text-orange pointer-events-none' />
                        </button>
                    </div>
                </td>
                <td className='px-2 md:px-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium'>
                    <p className='text-sm md:w-14 text-center md:text-base lg:text-lg'>${product.price * product.quantity}</p>

                </td>
                <td className='px-2 md:px-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium'>
                    <button onClick={() => removeFromCart(product.id)} className='w-8 bg-pale-orange p-2 rounded-md md:w-9 md:me-5 hover:bg-orange hover:text-white'><TrashIcon/></button>
                </td>
                
            
        </tr>
        
    )
}

export default function Page() {
  return (
    <div className="flex flex-col w-full lg:flex-row gap-6 lg:gap-12 px-4 md:px-6 py-6 md:py-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <div className=" rounded-lg overflow-hidden w-full">
            <CartPage/>
        </div>
        
    </div>
    </div>
)
}

