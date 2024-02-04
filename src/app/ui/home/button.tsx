import Link from "next/link"
export default function Button({styles, href, text}: {styles: string, href: string, text: string}){
    return (
    <button className={styles}>
        <Link href={href}>{text}</Link>
    </button>
    )
}