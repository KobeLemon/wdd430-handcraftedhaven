import HeroSection from "@/app/ui/home/hero"
import heroImage from "../../public/images/hero.jpeg"
import TopSection from "@/app/ui/home/topSection"
import SocialSection from "@/app/ui/home/social"
import Footer from "@/app/ui/home/footer"
import artOneImage from '../../public/images/product-1.jpg';
import artTwoImage from '../../public/images/product-2.jpg';
import artThreeImage from '../../public/images/product-3.jpg';

import artisanOneImage from '../../public/images/artisan-1.jpg';
import artisanTwoImage from '../../public/images/artisan-2.jpg';
import artisanThreeImage from '../../public/images/artisan-3.jpg';
interface HeroData {
    header: string,
    subHeader: string
}

const heroData: HeroData = {
    header: "Handcrafted Treasures",
    subHeader: "Connecting Artisans with Connoisseurs"
}

const productsCardData = [
    {
      href: "/products",  
      imageData: {
        src: artOneImage,
        alt: "Image 1",
      },
      subHeader: "Clay Bull",
      description: "Handcrafted Ceremonial Bull Clay Scuplture",
    },
    {
      href: "/products",  
      imageData: {
        src: artTwoImage,
        alt: "Image 2",
      },
      subHeader: "Cement Jar",
      description: "A handmade cement jar with wooden spoons.",
    },
    {
        href: "/products",  
        imageData: {
          src: artThreeImage,
          alt: "Image 3",
        },
        subHeader: "Cut Board",
        description: "Handmade wood cut board",
      }
  ];

  const artisansCardData = [
    {
      href: "/products",  
      imageData: {
        src: artisanOneImage,
        alt: "Image 1",
      },
      subHeader: "John Smith",
      description: "Artisan since 2021",
    },
    {
      href: "/products",  
      imageData: {
        src: artisanTwoImage,
        alt: "Image 2",
      },
      subHeader: "Mahalo Tagalo",
      description: "Artisan since 2001",
    },
    {
        href: "/products",  
        imageData: {
          src: artisanThreeImage,
          alt: "Image 3",
        },
        subHeader: "Jane Doe",
        description: "Artisan since 2015",
      }
  ];


export default function Page() {
    return (
        <>
            <HeroSection image={heroImage} header={heroData.header} subHeader={heroData.subHeader}/>
            <div className="flex flex-col gap-20 my-20">
                <TopSection sectionType="Products" cardData={productsCardData}/>
                <TopSection sectionType="Artisans" cardData={artisansCardData}/>
            </div>
            <SocialSection/>
            <Footer/>
        </>
    )
}