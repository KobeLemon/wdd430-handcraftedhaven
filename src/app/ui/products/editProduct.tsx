
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
import { XCircleIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Product',
};



export default function EditProduct({id, name, category,
  price, description, collection, pictures, toggle, categories}:
  {id:string, name:string, category:string, price:string, description:string, collection:string,
    pictures:any, toggle:any, categories:Array<Category>}) {
  console.log(collection)

  const router = useRouter();
  const [uploadError, setUploadError] = useState()

  const [uploadedImageUrl, setUploadedImageUrl] = useState(pictures.big);

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
  console.log(_category)

  const changeCategory = (e:any) => {
    setCategory(e.target.value)
  }

  const handleDelete = async(e:any) =>{
    try{
      await fetch('/api/products/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id})
      })
      toggle();
    } catch(error:any){
      console.error('ERROR: failed to send data to server.')
    }
  }

  const formSubmission = async(e:any) => {
    e.preventDefault()
    const input : HTMLInputElement | null = document.getElementById('uploaded-image') as HTMLInputElement;
    const image : File | undefined = input?.files?.[0];
    const imageType = input.value.split('.')[input.value.split('.').length-1]
    console.log(imageType)
    let imageURL:string = pictures.big;
    console.log(imageType)
    try {
      if(/(jpg|jpeg|png|gif|bmp)$/i.test(imageType) == true){
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
      }
    } catch (error:any) {
        setUploadError(error.message);
    } finally {
      const cat = {value:0}
      for(let i =0; i< categories.length;i++){
        if(categories[i].name == _category){
          cat.value = categories[i].id
        }
      }

      const data = {
        id:id,
        name: _name,
        description: _description,
        price:_price,
        category:cat.value,
        picture_url: imageURL,
      }
      try{
        const results = await fetch('/api/products/update', {
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

      <button className='absolute top-2 right-5 font-bold text-right hover:text-orange transition-colors duration-300' type='button' onClick={toggle}>
        <XCircleIcon className='w-6 h-6' />
      </button>

      <form className="h-auto" onSubmit={formSubmission}>

        <div className='mb-6'>
          <h4 className='mb-2 h5'>Name</h4>
          <input className='w-full focus:ring-orange focus:border-orange' name='name' type='text' value={_name} onChange={changeName} required/>
        </div>

        <div className='mb-6'>
          <h4 className='mb-2 h5'>Description</h4>
          <input className='w-full focus:ring-orange focus:border-orange' name='description' type='text' value={_description} onChange={changeDescription} required/>
        </div>

        <div className='mb-6'>
          <h4 className='mb-2 h5'>Price</h4>
          <input className='w-full focus:ring-orange focus:border-orange' name='price' type='text' value={_price} onChange={changePrice} required/>
        </div>

        <div className='mb-6'>
          <h4 className='mb-2 h5'>Category</h4>
          <div className='flex flex-col sm:grid sm:grid-cols-2 sm:gap-y-2'>
            {categories.map((item:any) => {
                return (
                <label className="flex items-center gap-x-1" key={`categoryLabel${item.name}`}>
                  <input className="checked:text-orange checked:ring-orange" name='category' key={`category${item.id}`} value={item.name} type='radio' onChange={changeCategory} checked={_category==item.name} required/>
                  <span>{item.name}</span>
                </label>
                )
            })}
          </div>
        </div>

        <div className='block mb-12'>

          <div className="flex flex-col h-auto mx-auto">

            <div className='bg-white mb-2'>

              <UploadImage id={id} required={false} />

            </div>

            {uploadedImageUrl && (

              <div className="h-20" >
                
                <Image src={uploadedImageUrl} width='100' height='100' alt="Uploaded" className='absolute z-20' />
              </div>

            )}

          </div>

        </div>

        <div className='flex flex-wrap gap-3'>

          <button className='px-8 py-2 bg-[#15803d] text-white font-bold rounded-md'>Save Product</button>

          <button type="button" className='px-8 py-2 bg-[#dc2626] text-white font-bold rounded-md' onClick={handleDelete}>Delete Product</button>

        </div>

      </form>

    </div>

  );

}