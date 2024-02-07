'use client';
import { useEffect, useState } from "react";
import  {ShoppingCart , ShoppingCartProvider } from "@/app/ui/header/shopping-cart";
import Search from "@/app/ui/header/search";
import Profile from "@/app/ui/header/profile";
import Logo from "@/app/ui/header/logo";
import { Suspense } from "react";

export default function Nav() {
    const [cartData, setCartData] = useState<string | null>();
    const [productCount, setProductCount] = useState<number>(0);

    useEffect(() => {
        // Check if window is defined (i.e., we are in the browser environment)
        if (typeof window !== 'undefined') {
            const storedCartData = window.localStorage.getItem("cart");
            setCartData(storedCartData);
        }
    }, []);
    // useEffect to update productCount whenever cartData changes
    useEffect(() => {
        if (cartData) {
            const cartItems = JSON.parse(cartData);
            let totalItemsInCart = 0;

            cartItems.forEach((item: { quantity: number }) => {
                totalItemsInCart += item.quantity;
            });

            setProductCount(totalItemsInCart);
        } else {
            setProductCount(0);
        }
    }, [cartData]);

    return (
        <header className="bg-light-grayish-blue col-span-full">
            <nav className="flex justify-between h-full items-center">
                <Logo/>
                <Suspense>
                    <Search placeholder="Search Products"/>
                </Suspense>
                <div className="flex me-5 gap-5 justify-around md:me-10 md:gap-10">
                    <Profile/>
                    <ShoppingCart/>
                </div>
                
            </nav>
        </header>
    )
}