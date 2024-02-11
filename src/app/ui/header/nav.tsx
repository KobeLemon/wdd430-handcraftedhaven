'use client';
import { useEffect, useState } from "react";
import  {ShoppingCart , ShoppingCartProvider } from "@/app/ui/header/shopping-cart";
import Logo from "@/app/ui/header/logo";
import { Suspense } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		console.log(session);
		return (
			<>
				<div className="flex gap-5">
					<button onClick={() => signOut()}>Sign Out</button>
					<p>|</p>
					<a href="/profile">Go to {session?.user?.name}&apos;s Profile</a>
					<p>|</p>
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="flex gap-5">
					<button onClick={() => signIn() }>Sign In</button>
					<p>|</p>
				</div>
			</>
		);
	}
}

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
                <div className="flex me-5 gap-5 justify-around md:me-10 md:gap-10">
                    <AuthButton/>
                    <ShoppingCart/>
                </div>

            </nav>
        </header>
    )
}