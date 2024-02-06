import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import StarsRating from "../products/StarsRating";
interface CardProps {
    href: string
    imageData: string;
    subHeader: string;
    rating?: number | undefined;
  }

export default function Card({href, imageData, subHeader, rating}: CardProps){
    return (
        <Link href={href} className=" p-5 rounded-md flex flex-col hover:bg-light-grayish-blue">
            <Image src={imageData} alt={`image of ${subHeader}`} width="240" height="380" className="object-cover h-80 w-60 my-2 overflow-hidden"/>
            <div className="w-60">
                <h5 className="my-0 text-lg">{subHeader}</h5>
                {rating && <StarsRating rating={rating}/>}
                
            </div>
            
        </Link>
        
    )
}