'use client';

import { useState } from 'react';
import { StaticImageData } from 'next/image';
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
import ProductTab from '@/app/ui/products/ProductTab';

interface Product {

  title: string,

  author: string,

  description: string,

  price: number,

  images:  StaticImageData[],

  thumbnails:  StaticImageData[]

}

interface Review {

  id: number,

  date: string,

  fullName: string,

  review: string

}

const productData : Product = {

  title: 'Statue',

  author: 'Adipisci Unde',

  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repellendus dolores, ut, tempore laboriosam rerum facere ab, incidunt sint esse dolore accusantium necessitatibus. Adipisci repellat ipsum tempore eum quos. Unde.',

  price: 125.00,

  images: [artOneImage, artTwoImage, artThreeImage, artFourImage],

  thumbnails: [artOneThumbnail, artTwoThumbnail, artThreeThumbnail, artFourThumbnail]

} 

const reviews : Review[] = [

  {
    id: 1,
    date: '02-25-2022',
    fullName: 'John Doe',
    review: 'hic atque similique tempora autem eum, corrupti voluptas dolorem harum officia! Dolores incidunt a deserunt nostrum'
  },

  {
    id: 2,
    date: '01-25-2023',
    fullName: 'Jane Doe',
    review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam aperiam deleniti voluptates delectus excepturi'
  },

  {
    id: 3,
    date: '10-25-2023',
    fullName: 'Matt Simpson',
    review: 'Deleniti sit commodi nesciunt tempora sequi, possimus accusamus aut dicta laboriosam accusantium quibusdam perspiciatis voluptas nisi'
  },

]

export default function Page() {

  const [ quantity, setQuantity ] = useState( 0 );

  const handleMinusButtonClick = ( event: Event ) => setQuantity( previousQuantity => previousQuantity > 0 ? --previousQuantity : 0 );

  const handlePlusButtonClick = ( event: Event ) => setQuantity( previousQuantity => ++previousQuantity );

  return (

    <div>

      <div className='flex flex-col gap-10 mb-20 md:flex-row'>

        <ProductTab

          images={productData.images}

          thumbnails={productData.thumbnails}

        />

        <div className='basis-1/2 shrink-0 md:px-5 md:py-2'>

          <h1 className='h3 mb-1'>{ productData.title }</h1>
          <p className='mb-5'>By { productData.author }</p>

          <p className='mb-8'>
            { productData.description }
          </p>

          <div className='mb-10 text-2xl font-bold'>

            ${ productData.price }

          </div>

          <div className='flex justify-between items-stretch flex-wrap gap-5 max-w-96'>

            <div className='flex bg-light-grayish-blue'>

              <button className='p-2 text-xl font-bold rounded-tl-md rounded-bl-md hover:bg-grayish-blue' type='button' onClick={handleMinusButtonClick}>

                <MinusIcon className='w-5 h-5 font-bold text-orange pointer-events-none' />

              </button>

              <div className='p-2'>

                <span className='flex justify-center items-center font-bold h-6 w-6'>

                  { quantity }

                </span>

              </div>

              <button className='p-2 text-2xl font-bold rounded-tr-md rounded-br-md hover:bg-grayish-blue' type='button' onClick={handlePlusButtonClick}>

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