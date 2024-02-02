import Image, { StaticImageData } from "next/image";
import Link from "next/link";
interface CardProps {
    href: string
    imageData: { src: StaticImageData; alt: string };
    subHeader: string;
    description: string;
  }

export default function Card({href, imageData, subHeader, description}: CardProps){
    return (
        <Link href={href}>
            <Image src={imageData.src} alt={imageData.alt} width="300" height="400" className="h-96 w-auto"/>
            <h5>{subHeader}</h5>
            <p>{description}</p>
        </Link>
        
    )
}