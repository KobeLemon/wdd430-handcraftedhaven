
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
import { Category, Product } from '@/app/lib/definitions';

export const metadata: Metadata = {
  title: 'Product',
};



export default function EditProduct({id, name, category,
  price, description, collection, pictures, toggle, categories}:
  {id:number, name:string, category:string, price:string, description:string, collection:string,
    pictures:any, toggle:any, categories:Array<Category>}) {
  console.log(collection)
  const [uploadError, setUploadError] = useState()

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const [_name, setName] = useState(name)

  const changeName = (e:any) => {
    setName(e.target.value)
  }

  const [_description, setDescription] = useState(description)

  const changeDescription = (e:any) => {
    setDescription(e.target.value)
  }

  const [_price, setPrice] = useState(price)

  const changePrice = (e:any) => {
    setPrice(e.target.value)
  }

  const [_category, setCategory] = useState(category)

  const changeCategory = (e:any) => {
    setCategory(e.target.value)
    console.log(category)
  }

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

    <div className='absolute flex flex-col left-21 bottom-20 w-3/4 z-10 bg-grayish-blue artisan-change-image-container'>

      <button type='button' onClick={toggle}>X</button>

      <form className="h-auto" onSubmit={formSubmission}>
        <h4>Name</h4>
        <input name='name' type='text' value={name} onChange={changeName}/>
        <h4>Description</h4>
        <input name='description' type='text' value={description} onChange={changeDescription}/>
        <h4>Price</h4>
        <input name='price' type='text' value={price} onChange={changePrice}/>
        <h4>Category</h4>
        <div className='flex flex-row flex-wrap mt-2 mb-3'>
          {categories.map((item:any) => {
            return (
            <label className="w-1/2 ml-1 sm:w-1/3 md:w-1/4 lg:w-auto lg:mr-1" key={`categoryLabel${item.id}`}><input className="mr-2 mb-1 mt-2" name='category' key={`category${item.id}`} value={item.id} type='radio' onChange={changeCategory}/>{item.name}</label>
            )
          })}
        </div>
        <div className="flex flex-col bg-white h-auto mx-auto">
          <UploadImage id={id} />
          {uploadedImageUrl && (
                <div className="h-20" >
                <img src={uploadedImageUrl} alt="Uploaded" className='absolute z-20' />
                </div>
            )}
        </div>

        <button>Create Product</button>

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