
import Image, {StaticImageData} from "next/image"
import Button from "@/app/ui/home/button"
export default function HeroSection({image, header, subHeader}: {image: StaticImageData, header: string, subHeader: string}){
    return (
        <section>
            <Image
                src={image}
                alt=""
                className="w-full"
            />
            <div className="flex flex-col w-full items-center justify-center my-5">
                <h1 className="m-2">{header}</h1>
                <p>{subHeader}</p>
                <div className="flex flex-wrap gap-5 m-6">
                    <Button href="/artisans" text="Shop by Artisans" styles="bg-orange text-white px-8 py-2 rounded-md hover:bg-opacity-70 active:bg-orange focus:outline-none focus:ring focus:ring-pale-orange" />
                    <Button href="/products" text="Shop by Products" styles="bg-pale-orange px-8 py-2 rounded-md hover:bg-opacity-60  active:bg-pale-orange focus:outline-none focus:ring focus:ring-opacity-60" />
                </div>
                
            </div>
        </section>
    )
}

