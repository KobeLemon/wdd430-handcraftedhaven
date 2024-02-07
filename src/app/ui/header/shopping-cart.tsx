'use client'
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

type CartProduct = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  
type ShoppingCartContextType = {
  quantity: number;
  setCartQuantity: Dispatch<SetStateAction<number>>;
};

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export const ShoppingCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [quantity, setCartQuantity] = useState(0);

  useEffect(() => {
    // Retrieve items from local storage
    const cartItems: CartProduct[] | null = JSON.parse(localStorage.getItem('cart') || 'null');

    // Calculate total quantity
    const totalQuantity = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

    // Update quantity
    setCartQuantity(totalQuantity);
  }, []);
  return (
    <ShoppingCartContext.Provider value={{ quantity, setCartQuantity }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = (): ShoppingCartContextType => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
  }
  return context;
};



export const ShoppingCart: React.FC = () => {
  const { quantity } = useShoppingCart();

  return (
    <Link href={"/cart"}>
      <div className='flex'>
        <ShoppingCartIcon className="w-6" />
        <SuperScript />
      </div>
    </Link>
  );
};



export const SuperScript: React.FC = () => {
  const { quantity } = useShoppingCart();
  return quantity ? <sup className='bg-orange p-2 text-center rounded-full text-white font-extrabold -ml-2 mb-2'>{quantity}</sup> : null
};