
// import { useState } from 'react';
// import { StaticImageData } from 'next/image';
// import artOneImage from '../../../../public/images/art-1.jpg';
// import artTwoImage from '../../../../public/images/art-2.jpg';
// import artThreeImage from '../../../../public/images/art-3.jpg';
// import artFourImage from '../../../../public/images/art-4.jpg';
// import artOneThumbnail from '../../../../public/thumbnails/art-1.jpg';
// import artTwoThumbnail from '../../../../public/thumbnails/art-2.jpg';
// import artThreeThumbnail from '../../../../public/thumbnails/art-3.jpg';
// import artFourThumbnail from '../../../../public/thumbnails/art-4.jpg';
import Image from 'next/image';
import { Review } from '@/app/lib/test-definitions';
import ReviewsList from '@/app/ui/products/ReviewsList';
import ReviewForm from '@/app/ui/products/ReviewForm';
import CartQuantityButtons from '@/app/ui/products/CartQuantityButtons';
import { fetchProductById } from '@/app/lib/test-data';


const reviews : Review[] = [

  {
    id: 1,
    date: '02-25-2022',
    name: 'John Doe',
    review: 'hic atque similique tempora autem eum, corrupti voluptas dolorem harum officia! Dolores incidunt a deserunt nostrum'
  },

  {
    id: 2,
    date: '01-25-2023',
    name: 'Jane Doe',
    review: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam aperiam deleniti voluptates delectus excepturi'
  },

  {
    id: 3,
    date: '10-25-2023',
    name: 'Matt Simpson',
    review: 'Deleniti sit commodi nesciunt tempora sequi, possimus accusamus aut dicta laboriosam accusantium quibusdam perspiciatis voluptas nisi'
  },

]

export default async function Page({

  params

} : {

  params: { id: number }

} ) {

  const productId : number = params.id;

  const product = await fetchProductById( productId );

  // console.log(product);

  return (

    <div>

      <div className='flex flex-col gap-10 mb-20 md:flex-row'>

        <div className='relative w-full rounded-xl overflow-hidden'>

          <Image

            className='object-contain'
          
            src={product.image}

            alt=""

            fill
          
          />

        </div>

        <div className='basis-1/2 shrink-0 md:px-5 md:py-2'>

          <h1 className='h3 mb-1'>{ product.title }</h1>
          <p className='mb-5'>By { '[author]' }</p>

          <p className='mb-8'>
            { product.description }
          </p>

          <div className='mb-10 text-2xl font-bold'>

            ${ product.price }

          </div>

          <CartQuantityButtons />

        </div>

      </div>

      <div className='mb-20'>

        <h2 className='h3'>Reviews</h2>

        <ReviewsList list={reviews} />

      </div>

      <ReviewForm />

    </div>

  );

}