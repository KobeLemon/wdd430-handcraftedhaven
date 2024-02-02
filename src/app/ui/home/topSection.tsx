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
            <main className="flex justify-around">
                {cardData.map((data, index) => (
                    <Card key={index} href={data.href} imageData={data.imageData} subHeader={data.subHeader} description={data.description} />
                ))}
                
            </main>
        </section>
    )
}

