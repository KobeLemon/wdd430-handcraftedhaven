import { kumbhSans } from "@/app/ui/fonts";
import Link from "next/link";

export default function Logo(){
    return (
        
        <Link href={"/"} className="ms-5 flex " >
            <h1 className={`${kumbhSans.className }text-very-dark-blue text-sm font-extrabold items-center m-0 md:text-lg lg:text-xl `}>Handcrafted Haven</h1>
         </Link>
    )
}