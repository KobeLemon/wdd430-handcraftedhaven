import ShoppingCart from "@/app/ui/shopping-cart";
import Search from "@/app/ui/search";
import Profile from "@/app/ui/profile";
import Logo from "@/app/ui/logo";

export default function Nav(){
    return (
        <header className="bg-light-grayish-blue col-span-full">
            <nav className="flex justify-around h-full items-center">
                <Logo/>
                <Search placeholder="Search Products"/>
                <Profile/>
                <ShoppingCart/>
            </nav>
        </header>
    )
}