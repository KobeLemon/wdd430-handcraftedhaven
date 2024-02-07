'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ReviewFormSchema = z.object( {

  name: z.string().trim().min( 1, { message: 'Name is required'} ),

  productid: z.string().trim(),

  review: z.string().trim().min( 1, { message: 'Review is required'} ),

  rating: z.coerce

    .number( { invalid_type_error: 'Please select a rating' } )

    .gte(1, { message: 'Please select a rating please' })

    .lte(5, { message: 'Please enter a rating less than 5.' })

} );

export type State = {

  errors?: {

    name?: string[];

    productid?: string[];

    review?: string[];

    rating?: string[];

  };

  message?: string | null;

}

export async function createReview( prevState: State | Promise<State>, formData: FormData ) {

  const validatedFields = ReviewFormSchema.safeParse( {

    name: formData.get( 'name' ),

    productid: formData.get( 'productid' ),

    review: formData.get( 'review' ),

    rating: formData.get( 'rating' )

  } );

  
  if ( ! validatedFields.success ) {

    return {

      errors: validatedFields.error.flatten().fieldErrors,

      message: 'Missing Fields. Failed to create review'

    }

  }

  const { name, review, rating, productid } = validatedFields.data;

  try {

    await sql`
      INSERT INTO HandcraftedHavenReviews (productid, name, description, rating) VALUES (${productid}, ${name}, ${review}, ${rating})
    `;

  } catch ( error ) {
    
    return {
      message: 'Database Error: Failed to Create Review.',
      errors: {}
    }

  }

  // revalidatePath(`/products/${productid}`);
  redirect(`/products/${productid}`);

  return {
    message: '',
    errors: {}
  } as State

}