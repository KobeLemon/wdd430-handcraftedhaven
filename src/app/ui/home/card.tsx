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
        <Link href={href} className=" p-5 rounded-md flex flex-col items-center hover:bg-light-grayish-blue">
            <Image src={imageData.src} alt={imageData.alt} width="300" height="400" className="object-cover h-96 w-60 my-2 overflow-hidden"/>
            <div className="w-60">
                <h5 className="my-0">{subHeader}</h5>
                <p>{description}</p>
            </div>
            
        </Link>
        
    )
}