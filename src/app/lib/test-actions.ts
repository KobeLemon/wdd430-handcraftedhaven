'use server'

import { z } from 'zod'; 

const ReviewFormSchema = z.object( {

  name: z.string().trim().min( 1, { message: 'Name is required'} ),

  review: z.string().trim().min( 1, { message: 'Review is required'} ),

  rating: z.coerce

    .number( { invalid_type_error: 'Please select a rating' } )

    .gte(1, { message: 'Please select a rating please' })

    .lte(5, { message: 'Please enter a rating less than 5.' })

} );

export type State = {

  errors?: {

    name?: string[];

    review?: string[];

    rating?: string[];

  };

  message?: string | null;

}

export async function createReview( prevState: State, formData: FormData ) {

  console.log(prevState, "Check Previous state")

  // console.log( formData.get('name'), formData.get('review'), formData.get('rating'), 'boom' )

  const validatedFields = ReviewFormSchema.safeParse( {

    name: formData.get( 'name' ),

    review: formData.get( 'review' ),

    rating: formData.get( 'rating' )

  } );

  console.log( validatedFields, 'VALIDATED FIELDS' );

  if ( ! validatedFields.success ) {

    return {

      errors: validatedFields.error.flatten().fieldErrors,

      message: 'Missing Fields. Failed to create review'

    }

  }

  const { name, review, rating } = validatedFields.data;

  const date = new Date().toISOString().split('T')[0];

  console.log( validatedFields.data, 'CHECKING FIELDS' );

  try {
    
    

  } catch ( error ) {
    
    return {
      message: 'Database Error: Failed to Create Review.',
      errors: {}
    }

  }

}