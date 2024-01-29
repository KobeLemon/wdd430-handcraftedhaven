'use client';

import { useRef } from 'react';
import Image from 'next/image';
import artOneImage from '../../../../public/images/art-1.jpg';
import artTwoImage from '../../../../public/images/art-2.jpg';
import artThreeImage from '../../../../public/images/art-3.jpg';
import artFourImage from '../../../../public/images/art-4.jpg';
import artOneThumbnail from '../../../../public/thumbnails/art-1.jpg';
import artTwoThumbnail from '../../../../public/thumbnails/art-2.jpg';
import artThreeThumbnail from '../../../../public/thumbnails/art-3.jpg';
import artFourThumbnail from '../../../../public/thumbnails/art-4.jpg';
import { ShoppingCartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import ReviewsList from '@/app/ui/products/ReviewsList';

const reviews : Object[] = [

  {
    date: '02-25-2022',
    fullName: 'John Doe',
    review: 'hic atque similique tempora autem eum, corrupti voluptas dolorem harum officia! Dolores incidunt a deserunt nostrum'
  },

  {
    date: '01-25-2023',
    fullName: 'Jane Doe',
    review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam aperiam deleniti voluptates delectus excepturi'
  },

  {
    date: '10-25-2023',
    fullName: 'Matt Simpson',
    review: 'Deleniti sit commodi nesciunt tempora sequi, possimus accusamus aut dicta laboriosam accusantium quibusdam perspiciatis voluptas nisi'
  },

]

export default function Page() {

  const carouselItemsContainerRef = useRef( null );

  let carouselItems : HTMLDivElement[] = [];

  const carouselTabClickHandler = ( event: Event ) : void => {

    if ( ! carouselItems.length ) carouselItems = Array.from( carouselItemsContainerRef.current.children );

    const target = event.target.closest( 'button' ) as HTMLButtonElement;

    carouselItems.forEach( (carouselItem : HTMLDivElement) => {

      carouselItem.setAttribute( 'aria-hidden', target.getAttribute( 'aria-controls' ) !== carouselItem.getAttribute( 'id' ) );

    } );

  }

  return (

    <div>

      <div className='flex flex-col gap-10 md:flex-row'>

        <div className='basis-1/2 mb-20'>

          <div ref={carouselItemsContainerRef} className='grid grid-rows-1 grid-cols-1 mb-4 rounded-xl overflow-hidden'>

            <div id='carousel-item-1' className='row-start-1 col-start-1 aria-hidden:hidden' aria-labelledby='carousel-tab-1' aria-hidden="false">

              <Image 
              
                src={artOneImage}
                
                alt='' 
                
              />
              
            </div>

            <div id='carousel-item-2' className='row-start-1 col-start-1 aria-hidden:hidden' aria-labelledby='carousel-tab-2' aria-hidden="true">

              <Image 
              
                src={artTwoImage}
                
                alt='' 
                
              />
              
            </div>

            <div id='carousel-item-3' className='row-start-1 col-start-1 aria-hidden:hidden' aria-labelledby='carousel-tab-3' aria-hidden="true">

              <Image 
              
                src={artThreeImage}
                
                alt='' 
                
              />
              
            </div>

            <div id='carousel-item-4' className='row-start-1 col-start-1 aria-hidden:hidden' aria-labelledby='carousel-tab-4' aria-hidden="true">

              <Image 
              
                src={artFourImage}
                
                alt='' 
                
              />
              
            </div>

          </div>

          <div className='flex gap-x-5 items-stretch'>

            <button id='carousel-tab-1' className='rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline focus-visible:outline-orange hover:opacity-60 transition-opacity' type='button' aria-controls='carousel-item-1' onClick={carouselTabClickHandler}>

              <Image
                className='pointer-events-none'
                src={artOneThumbnail} 
                alt=''
                width={176}
                height={176} 
              />

            </button>

            <button id='carousel-tab-2' className='rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline focus-visible:outline-orange hover:opacity-60 transition-transform' type='button' aria-controls='carousel-item-2' onClick={carouselTabClickHandler}>

              <Image
                className='pointer-events-none'
                src={artTwoThumbnail} 
                alt=''
                width={176}
                height={176} 
              />

            </button>

            <button id='carousel-tab-3' className='rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline focus-visible:outline-orange hover:opacity-60 transition-transform' type='button' aria-controls='carousel-item-3' onClick={carouselTabClickHandler}>

              <Image
                className='pointer-events-none'
                src={artThreeThumbnail} 
                alt=''
                width={176}
                height={176} 
              />

            </button>

            <button id='carousel-tab-4' className='rounded-xl overflow-hidden focus-visible:outline-2 focus-visible:outline focus-visible:outline-orange hover:opacity-60 transition-transform' type='button' aria-controls='carousel-item-4' onClick={carouselTabClickHandler}>

              <Image
                className='pointer-events-none'
                src={artFourThumbnail} 
                alt=''
                width={176}
                height={176} 
              />

            </button>

          </div>

        </div>

        <div className='basis-1/2 mb-20 sm:px-5 sm:py-2'>

          <h1 className='h3 mb-1'>Lorem ipsum dolor</h1>
          <p className='mb-5'>By Adipisci Unde</p>

          <p className='mb-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repellendus dolores, ut, tempore laboriosam rerum facere ab, incidunt sint esse dolore accusantium necessitatibus. Adipisci repellat ipsum tempore eum quos. Unde.</p>

          <div className='mb-10 text-2xl font-bold'>

            $125

          </div>

          <div className='flex justify-between items-stretch flex-wrap gap-5 max-w-96'>

            <div className='flex bg-light-grayish-blue'>

              <button className='p-2 text-xl font-bold' type='button'>

                <MinusIcon className='w-5 h-5 font-bold text-orange pointer-events-none' />

              </button>

              <div className='p-2'>

                <span className='flex justify-center items-center font-bold h-6 w-6'>

                  0

                </span>

              </div>

              <button className='p-2 text-2xl font-bold' type='button'>

                <PlusIcon className='w-5 h-5 font-bold text-orange pointer-events-none' />

              </button>

            </div>

            <div>

              <button className='inline-flex items-center gap-x-2 px-8 py-2 bg-orange text-white rounded-md' type='button'>

                <ShoppingCartIcon className='w-5 h-5' />

                <span>Add To Cart</span>

              </button>

            </div>

          </div>

        </div>

      </div>

      <div className='mb-20'>

        <h2 className='h3'>Reviews</h2>

        <ReviewsList list={reviews} />

      </div>

      <div>

        <h2 className='h3'>Add A Review</h2>

        <form className='max-w-96' action="">

          <div className='flex flex-col gap-y-1 mb-4'>

            <label htmlFor="fullName">Full Name</label>

            <input className='focus:border-orange focus:ring-orange rounded-md' id='fullName' type="text"  />

          </div>

          <div className='flex flex-col gap-y-1 mb-8'>

            <label htmlFor="review">Review</label>

            <textarea className='focus:border-orange focus:ring-orange rounded-md' name='review' id='review' cols='30' rows='5'></textarea>

          </div>

          <button className='px-8 py-2 bg-orange text-white rounded-md' type='submit'>

            Submit Review

          </button>

        </form>

      </div>

    </div>

  );

}