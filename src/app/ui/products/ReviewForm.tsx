'use client'

import { useFormState } from 'react-dom';
import Button from './Button';
import { StarIcon } from '@heroicons/react/16/solid';
import { State, createReview } from '@/app/lib/test-actions';
import { useParams } from 'next/navigation';

export default function ReviewForm() {

  const params = useParams<{ id: string;}>();

  const productId = params.id;

  const initialState = {

    message: null,

    errors: {}

  }

  const [ state, dispatch ] = useFormState( createReview, initialState );

  return (

    <div>

      <h2 className='h3'>Leave A Review</h2>

      <form className='max-w-96' action={dispatch}>

        {/* Product id */}
        <div className='hidden'>

          <label htmlFor="productid"></label>

          <input className='focus:border-orange focus:ring-orange rounded-md' name='productid' id='productid' type="text" defaultValue={productId} />

        </div>

        {/* Reviewer Name */}
        <div className='flex flex-col gap-y-1 mb-4'>

          <label htmlFor="name">Name</label>

          <input className='focus:border-orange focus:ring-orange rounded-md' name='name' id='name' type="text" />

          <div id="name-error" aria-live="polite" aria-atomic="true">
            {
              state?.errors?.name &&
                state?.errors.name.map((error: string) => (
                  <p className="mt-1 text-sm text-[#ef4444]" key={error}>
                    {error}
                  </p>
                ))
            }
          </div>

        </div>

        {/* Review */}
        <div className='flex flex-col gap-y-1 mb-4'>

          <label htmlFor="review">Review</label>

          <textarea className='focus:border-orange focus:ring-orange rounded-md' name='review' id='review'></textarea>

          <div id="review-error" aria-live="polite" aria-atomic="true">
            {
              state?.errors?.review &&
                state?.errors.review.map((error: string) => (
                  <p className="mt-1 text-sm text-[#ef4444]" key={error}>
                    {error}
                  </p>
                ))
            }
          </div>

        </div>

        {/* Rating */}
        <div className='flex flex-col gap-y-1 mb-8'>

          <div>Rating</div>

          <div className='flex flex-row-reverse justify-end gap-x-1'>

            <label className='relative overflow-hidden has-[:checked]:text-[#ffdf00] [&:has(input:checked)~label]:text-[#ffdf00]' htmlFor='rating-5'>
              <input className='absolute w-[1px] h-[1px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 focus:outline-none focus:ring-offset-0' type="radio" name="rating" id="rating-5" value={5} />
              <StarIcon className='h-8 w-8' />
            </label>

            <label className='relative overflow-hidden has-[:checked]:text-[#ffdf00] [&:has(input:checked)~label]:text-[#ffdf00]' htmlFor='rating-4'>
              <input className='absolute w-[1px] h-[1px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 focus:outline-none focus:ring-offset-0' type="radio" name="rating" id="rating-4" value={4} />
              <StarIcon className='h-8 w-8' />
            </label>

            <label className='relative overflow-hidden has-[:checked]:text-[#ffdf00] [&:has(input:checked)~label]:text-[#ffdf00]' htmlFor='rating-3'>
              <input className='absolute w-[1px] h-[1px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 focus:outline-none focus:ring-offset-0' type="radio" name="rating" id="rating-3" value={3} />
              <StarIcon className='h-8 w-8' />
            </label>

            <label className='relative overflow-hidden has-[:checked]:text-[#ffdf00] [&:has(input:checked)~label]:text-[#ffdf00]' htmlFor='rating-2'>
              <input className='absolute w-[1px] h-[1px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 focus:outline-none focus:ring-offset-0' type="radio" name="rating" id="rating-2" value={2} />
              <StarIcon className='h-8 w-8' />
            </label>

            <label className='relative overflow-hidden has-[:checked]:text-[#ffdf00] [&:has(input:checked)~label]:text-[#ffdf00]' htmlFor='rating-1'>
              <input className='absolute w-[1px] h-[1px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 focus:outline-none focus:ring-offset-0' type="radio" name="rating" id="rating-1" value={1} />
              <StarIcon className='h-8 w-8' />
            </label>

          </div>

          <div id="rating-error" aria-live="polite" aria-atomic="true">
            {
              state?.errors?.rating &&
                state?.errors.rating.map((error: string) => (
                  <p className="mt-1 text-sm text-[#ef4444]" key={error}>
                    {error}
                  </p>
                ))
            }
          </div>

        </div>

        <Button type='submit' text='Submit Review' />

      </form>

    </div>

  )

}