import { kumbhSans } from "@/app/ui/fonts";
import Link from "next/link";

export default function Logo(){
    return (
        
        <Link href={"/"} >
            <h1 className={`${kumbhSans.className }text-very-dark-blue text-xl font-extrabold`}>Handcrafted Haven</h1>
         </Link>
    )
}