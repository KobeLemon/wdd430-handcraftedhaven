import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function ShoppingCart(){
    return (
        <Link href={"/cart"}>
            <ShoppingCartIcon className="w-6"/>
        </Link>
    )
}