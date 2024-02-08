
import Image from 'next/image';
import ReviewsList from '@/app/ui/products/ReviewsList';
import ReviewForm from '@/app/ui/products/ReviewForm';
import CartQuantityButtons from '@/app/ui/products/CartQuantityButtons';
import { getProductById, getReviewsByProductId } from '@/app/lib/data';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import StarsRating from "../../ui/products/StarsRating";

export const metadata: Metadata = {
  title: 'Product',
};

export default async function Page({

  params

} : {

  params: { id: string }

} ) {

  const productId : string = params.id;

  const product = await getProductById( productId );

  const reviews = await getReviewsByProductId( productId );

  return (

    <main className='p-8 sm:p-10'>

      <div className='flex flex-col gap-10 mb-20 md:flex-row'>

        <div className='relative min-h-80 w-full rounded-xl overflow-hidden'>

          <Image

            className='object-cover'

            src={product.pictures.big}

            alt=""

            fill

          />

        </div>

        <div className='basis-1/2 shrink-0 md:px-5 md:py-2'>

          <h1 className='h3 mb-1'>{ product.name }</h1>
          <p className='mb-2'>By { product.artisan_name }</p>

					<p className='text-dark-grayish-blue mb-5'>{ product.category_name }</p>


          <p className='mb-8'>
            { product.description }
          </p>


          <div className='mb-8 text-2xl font-bold'>

            ${ product.price }

          </div>
					<div className='mb-5'>
						<StarsRating rating={ product.rating} />
					</div>

          <CartQuantityButtons />

        </div>

      </div>

      <div className='mb-20'>

        <h2 className='h3'>Reviews</h2>

        <ReviewsList reviews={reviews} />

      </div>

      <ReviewForm />
      <Toaster />

    </main>

  );

}