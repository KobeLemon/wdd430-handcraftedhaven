
import Image from 'next/image';
import ReviewsList from '@/app/ui/products/ReviewsList';
import ReviewForm from '@/app/ui/products/ReviewForm';
import CartQuantityButtons from '@/app/ui/products/CartQuantityButtons';
import { getProductById, getReviewsByProductId } from '@/app/lib/data';
import { Metadata } from 'next';
import { Toaster } from 'sonner';
import StarsRating from "../../ui/products/StarsRating";
import { MouseEventHandler, useState } from 'react';
import UploadImage from './uploadImage';
import { Category } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Product',
};



export default function CreateProduct({id, toggle, categories}:{id:number, toggle: any, categories:Array<Category>}) {

  const [name, setName] = useState('Product Name')

  const changeName = (e:any) => {
    setName(e.target.value)
  }

  const [description, setDescription] = useState('Description Example')

  const changeDescription = (e:any) => {
    setDescription(e.target.value)
  }

  const [price, setPrice] = useState('10.54')

  const changePrice = (e:any) => {
    setPrice(e.target.value)
  }

  const [category, setCategory] = useState('10.54')

  const changeCategory = (e:any) => {
    setCategory(e.target.value)
    console.log(category)
  }

  return (

    <div className='absolute flex flex-col left-21 bottom-20 w-3/4 z-10 bg-grayish-blue artisan-change-image-container'>

      <button type='button' onClick={toggle}>X</button>

      <form className="h-auto">
        <h4>Name</h4>
        <input name='name' type='text' value={name} onChange={changeName}/>
        <h4>Description</h4>
        <input name='description' type='text' value={description} onChange={changeDescription}/>
        <h4>Price</h4>
        <input name='price' type='text' value={price} onChange={changePrice}/>
        <h4>Category</h4>
        <div className='flex flex-row flex-wrap mt-2 mb-3'>
          {categories.map((item:any, index) => {
            return (<>
            <label className="w-1/2 ml-1 sm:w-1/3 md:w-1/4 lg:w-auto lg:mr-1"><input className="mr-2 mb-1 mt-2" name='category' value={index+1} type='radio' onChange={changeCategory}/>{item.name}</label>
            </>
            )
          })}
        </div>
        <div className="flex flex-col bg-white h-auto mx-auto">
          <UploadImage id={id} />
        </div>

      </form>

      {/* <div className='flex flex-col gap-10 mb-20 md:flex-row'>

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
      <Toaster /> */}

    </div>

  );

}