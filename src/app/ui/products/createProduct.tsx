
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
import { XCircleIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Product',
};



export default function CreateProduct({id, collection, toggle, categories}:{id:string, collection:string, toggle: any, categories:Array<Category>}) {
  console.log(collection)
  const [uploadError, setUploadError] = useState()

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

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

  const router = useRouter()

  const formSubmission = async(e:any) => {
    e.preventDefault()
    const input : HTMLInputElement | null = document.getElementById('uploaded-image') as HTMLInputElement;
    const image : File | undefined = input?.files?.[0];
    const imageType = input.value.split('.')[input.value.split('.').length-1]
    let imageURL:string = '/placeholder_large.webp';
    console.log(imageType)

    try {
      const result = await fetch('/api/products/imageUpload', {
      method: 'POST',
      body: image,
      headers: {
          'Content-Type': `image/${imageType}`, // Set the Content-Type header to image/*
      },
    })
      console.log(result)
      imageURL = await result.text()
      console.log(imageURL)
    } catch (error:any) {
        setUploadError(error.message);
    } finally {
      const data = {
        name: name,
        description: description,
        price:price,
        category:category,
        picture_url: imageURL,
        collection:collection,
        artisan_id: id,
      }
      try{
        const results = await fetch('/api/products/create', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        console.log(results)
      }catch(error:any){
        console.error({message:'Error: could not send new product data.'})
      }
    }

  }

  return (

    <div className='max-w-[100%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-grayish-blue rounded-md overflow-hidden p-5'>

      <button className='font-bold text-black hover:text-orange transition-colors duration-300' type='button' onClick={toggle}>
        <XCircleIcon className='w-6 h-6' />
      </button>

      <form className="h-auto text-left" onSubmit={formSubmission}>

        <div className='mb-6'>

          <h4 className='mb-2 h5'>Name</h4>
          <input className='w-full focus:ring-orange focus:border-orange' name='name' type='text' value={name} onChange={changeName} required/>

        </div>

        <div className='mb-6'>

          <h4 className='mb-2 h5'>Description</h4>
          <input className='w-full focus:ring-orange focus:border-orange' name='description' type='text' value={description} onChange={changeDescription} required/>

        </div>

        <div className='mb-6'>

          <h4 className='mb-2 h5'>Price</h4>
          <input className='w-full focus:ring-orange focus:border-orange' name='price' type='text' value={price} onChange={changePrice} required/>

        </div>

        <div className='mb-6'>

          <h4 className='mb-2 h5'>Category</h4>
          <div className='flex flex-col sm:grid sm:grid-cols-2 sm:gap-y-2'>
            {categories.map((item:any) => {
              return (
              <label className="flex items-center gap-x-1" key={`categoryLabel${item.id}`}>

                <input className="checked:text-orange checked:ring-orange" name='category' key={`category${item.id}`} value={item.id} type='radio' onChange={changeCategory} required/>

                <span>{item.name}</span>

              </label>
              )
            })}
          </div>

        </div>

        <div className="flex flex-col bg-white h-auto mx-auto mb-12">
          <UploadImage id={id} required={true}/>
          {uploadedImageUrl && (
              <div className="h-20" >
                <Image src={uploadedImageUrl} width='100' height='100' alt="Uploaded" className='absolute z-20' />
              </div>
          )}
        </div>

        <div className='text-center'>

          <button className='px-8 py-2 bg-orange text-black font-bold rounded-md'>Create Product</button>

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