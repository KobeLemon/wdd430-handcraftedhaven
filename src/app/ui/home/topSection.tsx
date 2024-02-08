import { StaticImageData } from "next/image";
import Card from "./card";
interface CommonType {
    id: string;
    name: string;
    description: string;
    price?: string;
    rating?: number;
    category?: string;
    collection: string;
    pictures: {
      small: string;
      medium: string;
      big: string;
    };
  }
  
  // Use the CommonType in both Props and Artisan
  interface Props extends CommonType {}
  
  interface Artisan extends CommonType {}
  
  interface TopSectionProps {
    sectionType: string;
    cardData: CommonType[];
  }
  
  // Adjust TopSection component to use CommonType
  export default function TopSection({ sectionType, cardData }: TopSectionProps) {
    return (
      <section className="flex flex-col h-full">
        <header className="ms-5">
          <h2> Top {sectionType}</h2>
        </header>
        <main className="flex flex-col justify-center items-center gap-6 lg:flex-row lg:justify-around lg:ms-2">
          {cardData.map((data, index) => (
            <Card
              key={index}
              href={`/${sectionType}/${data.id}`}
              imageData={data.pictures.medium}
              subHeader={data.name}
              rating={data.rating}
            />
          ))}
        </main>
      </section>
    );
  }