'use client';

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";

export default function ProductTab( { images, thumbnails } : { images: StaticImageData[], thumbnails: StaticImageData[] }) {

  const carouselItemsContainerRef = useRef( null );

  let carouselItems : HTMLDivElement[] | null = [];

  const carouselTabClickHandler = ( event: Event ) => {

    if ( ! carouselItems?.length ) carouselItems = Array.from( carouselItemsContainerRef?.current.children );

    const target = event.target?.closest( 'button' ) as HTMLButtonElement;

    carouselItems.forEach( (carouselItem : HTMLDivElement) => {

      carouselItem.setAttribute( 'aria-hidden', target.getAttribute( 'aria-controls' ) !== carouselItem.getAttribute( 'id' ) );

    } );

  }

  return (

    <div className="w-full">

      <div ref={carouselItemsContainerRef} className='grid grid-rows-1 grid-cols-1 mb-4 rounded-xl overflow-hidden'>

        {

          images.map( ( image, index ) => (

            <div key={index} id={`tab-item-${index + 1}`} className='row-start-1 col-start-1 aria-hidden:hidden' aria-labelledby={`tab-button-${index + 1}`} aria-hidden={index !== 0}>

              <Image 
              
                src={image}
                
                alt=''
                
              />
              
            </div>

          ) )

        }

      </div>

      <div className='flex gap-x-5 items-stretch'>

        {

          thumbnails.map( ( thumbnail, index ) => (

            <button key={index} id={`tab-button-${index + 1}`} className='relative w-1/4 min-w-10 min-h-10 aspect-square rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline focus-visible:outline-orange hover:opacity-60 transition-opacity' type='button' aria-controls={`tab-item-${index + 1}`} onClick={carouselTabClickHandler}>

              <Image
                className='pointer-events-none object-cover'
                src={thumbnail} 
                alt=''
                fill
                // width={176}
                // height={176}
              />

            </button>

          ) )

        }

      </div>

    </div>

  )

}