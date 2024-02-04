'use client';
import { UsersIcon, HomeIcon, ViewColumnsIcon, BuildingStorefrontIcon }from "@heroicons/react/16/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
const links = [
    {name: "Home", href: "/", icon: HomeIcon},
    {name: "Artisans", href: "/artisans", icon: UsersIcon},
    {name: "Categories", href: "/categories", icon: ViewColumnsIcon},
    {name: "Products", href: "/products", icon: BuildingStorefrontIcon},
]

export default function SidenavLinks(){
    const pathname = usePathname()

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link href={link.href} key={link.name} className='flex h-[48px] grow items-center m-0 justify-center gap-3 rounded-md bg-light-grayish-blue p-3 text-sm font-medium w-full hover:bg-grayish-blue hover:text-blue-600 md:justify-center md:p-2 md:px-3 lg:flex-none lg:justify-start'>
                        <LinkIcon className="w-6" />
                        <p className="hidden lg:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )

}