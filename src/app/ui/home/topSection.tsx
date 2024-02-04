import { StaticImageData } from "next/image";
import Card from "./card";
interface CardData {
    href: string
    imageData: { src: StaticImageData; alt: string };
    subHeader: string;
    description: string;
}
  
interface TopSectionProps {
    sectionType: string;
    cardData: CardData[];
}

export default function TopSection({sectionType, cardData}: TopSectionProps){
    return (
        <section className="flex flex-col h-full">
            <header className="ms-5">
                <h2> Top {sectionType}</h2>
            </header>
            <main className="flex flex-col justify-center items-center gap-6 lg:flex-row lg:justify-around lg:ms-2">
                {cardData.map((data, index) => (
                    <Card key={index} href={data.href} imageData={data.imageData} subHeader={data.subHeader} description={data.description} />
                ))}
                
            </main>
        </section>
    )
}

