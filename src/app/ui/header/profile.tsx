import { UserIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function Profile(){
    return (
        <Link href={"/profile"}>
            <UserIcon className="w-6"/>
        </Link>
    )
}