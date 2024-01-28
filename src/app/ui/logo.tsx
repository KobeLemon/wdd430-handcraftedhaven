import { kumbhSans } from "@/app/ui/fonts";
import Link from "next/link";

export default function Logo(){
    return (
        
        <Link href={"/"} className="ms-5" >
            <h1 className={`${kumbhSans.className }text-very-dark-blue text-sm font-extrabold md:text-lg lg:text-xl `}>Handcrafted Haven</h1>
         </Link>
    )
}