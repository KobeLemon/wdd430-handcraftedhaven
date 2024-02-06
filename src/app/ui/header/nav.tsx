import ShoppingCart from "@/app/ui/header/shopping-cart";
import Search from "@/app/ui/header/search";
import Profile from "@/app/ui/header/profile";
import Logo from "@/app/ui/header/logo";
import { Suspense } from "react";

export default function Nav(){
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