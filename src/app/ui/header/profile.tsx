import { UserIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { Artisan } from "@/app/lib/definitions";

export default function Profile(){
    return (
        <Link href={`/profile`}>
            <UserIcon className="w-6"/>
        </Link>
    )
}