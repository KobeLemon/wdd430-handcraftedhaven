import { sql } from '@vercel/postgres';
import {
  Product,
  Artisan,
  Review,
  User,
  Category
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUserByEmail(email:string) {
  noStore();
  try {
		let response;
    const user = await sql`SELECT id, email FROM HandcraftedHavenUsers WHERE email=${email}`;
		if (user.rows.length > 0 ) {
			response = user.rows[0] as User;
		} else {
			response = false;
		}
		return response;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getArtisanById(_id: string){
  noStore();
  try {
      const artisan = await sql`SELECT * FROM HandcraftedHavenArtisans WHERE id=${_id}`
      const rawObj = artisan.rows[0];
      const picArray = {value:''}
        if(rawObj.pictures.length > 1) picArray.value = rawObj.pictures
        else picArray.value = rawObj.pictures[0].split(',')
      rawObj.pictures = {small: picArray.value[0], medium: picArray.value[0], big: picArray.value[0]}

      return rawObj as Artisan
  } catch (error) {
      console.error('Failed to fetch artisan:', error);
      throw new Error('Failed to fetch artisan.');
  }
}


export async function getProductById(_id: string){
  noStore();
  try {
		const product = await sql`SELECT * FROM HandcraftedHavenProducts WHERE id=${_id}`
		const rawObj = product.rows[0];
		const artisanID = rawObj.artisan_id;
		const full_product = await sql`
			SELECT
				HandcraftedHavenProducts.*,
				HandcraftedHavenArtisans.name as artisan_name,
				HandcraftedHavenCategories.name as category_name
			FROM HandcraftedHavenProducts
			INNER JOIN HandcraftedHavenArtisans
				ON HandcraftedHavenProducts.artisan_id = HandcraftedHavenArtisans.id
			INNER JOIN HandcraftedHavenCategories
				ON HandcraftedHavenProducts.category = HandcraftedHavenCategories.id
			WHERE
				HandcraftedHavenProducts.artisan_id = ${artisanID}
				AND HandcraftedHavenProducts.id = ${_id}`;
		const rawFullObj = full_product.rows[0];
    const picArray = {value:''}
    if(rawFullObj.pictures.length > 1) picArray.value = rawFullObj.pictures
    else picArray.value = rawFullObj.pictures[0].split(',')
    console.log('guy-ooo guy-oooo whoa oh',picArray.value)
    rawFullObj.pictures = {small: picArray.value[0], medium: picArray.value[1], big: picArray.value[2]}

    return rawFullObj as Product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function getReviewsByProductId(productID: string){
  noStore();
  try {
      const product = await sql`SELECT * FROM HandcraftedHavenReviews WHERE productId=${productID}`
      const results = product.rows;

      const processed = results.map(item => item as Review);

      return processed as Array<Review>;
  } catch (error) {
      console.error('Failed to fetch product:', error);
      throw new Error('Failed to fetch product.');
  }
}

export async function getProductsByCollection(collectionID: string){
  noStore();
  try {
      const product = await sql`SELECT * FROM HandcraftedHavenProducts WHERE collection=${collectionID}`
      const results = product.rows;
      const processed = results.map(item => {
        const picArray = {value:''}
        if(item.pictures.length > 1) picArray.value = item.pictures
        else picArray.value = item.pictures[0].split(',')
        item.pictures = {small: picArray.value[0], medium: picArray.value[1], big: picArray.value[2]}

        return item as Product;
      })

      return processed as Array<Product>
  } catch (error) {
      console.error('Failed to fetch product:', error);
      throw new Error('Failed to fetch product.');
  }
}

export async function getProductsByCategory(categoryID: number){
  noStore();
  try {
      const products = await sql`SELECT HandcraftedHavenProducts.*, HandcraftedHavenCategories.name as category FROM HandcraftedHavenProducts LEFT JOIN HandcraftedHavenCategories ON HandcraftedHavenProducts.category = HandcraftedHavenCategories.id WHERE category = ${categoryID}`
      const results = products.rows;

      const processed = results.map(item => {
        const picArray = {value:''}
        if(item.pictures.length > 1) picArray.value = item.pictures
        else picArray.value = item.pictures[0].split(',')
        item.pictures = {small: picArray.value[0], medium: picArray.value[1], big: picArray.value[2]}

        return item as Product;
      })

      return processed as Array<Product>
  } catch (error) {
      console.error('Failed to fetch product:', error);
      throw new Error('Failed to fetch product.');
  }
}

export async function getArtisanByProduct(product: string | Product){
  noStore();
  let value: string = "";
  if(typeof product == 'string'){
    value = product
  }
  else if('collection' in product) value = product.collection
  try {
      const product = await sql`SELECT * FROM HandcraftedHavenArtisans WHERE collection=${value}`
      const results = product.rows[0];
      const picArray = {value:''}
        if(results.pictures.length > 1) picArray.value = results.pictures
        else picArray.value = results.pictures[0].split(',')
      results.pictures = {small: picArray.value[0], medium: picArray.value[1], big: picArray.value[2]}

      return results as Artisan
  } catch (error) {
      console.error('Failed to fetch artisan:', error);
      throw new Error('Failed to fetch artisan.');
  }
}

export async function getProducts(){
  noStore();
  try {
      const products = await sql`SELECT HandcraftedHavenProducts.*, HandcraftedHavenCategories.name as category FROM HandcraftedHavenProducts LEFT JOIN HandcraftedHavenCategories ON HandcraftedHavenProducts.category = HandcraftedHavenCategories.id`
      const results = products.rows;
      const processed = results.map(item => {
        const picArray = {value:''}
        if(item.pictures.length > 1) picArray.value = item.pictures
        else picArray.value = item.pictures[0].split(',')
        item.pictures = {small: picArray.value[0], medium: picArray.value[1], big: picArray.value[2]}

        return item as Product;
      })

      return processed as Array<Product>
  } catch (error) {
      console.error('Failed to fetch product:', error);
      throw new Error('Failed to fetch product.');
  }
}

export async function getProductsByArtisan(id: string){
  noStore();
  try {
      const products = await sql`
            SELECT HandcraftedHavenProducts.*, HandcraftedHavenCategories.name as category
                FROM HandcraftedHavenProducts
                LEFT JOIN HandcraftedHavenCategories ON HandcraftedHavenProducts.category = HandcraftedHavenCategories.id
                WHERE HandcraftedHavenProducts.artisan_id = ${id}`
      const results = products.rows;
      const processed = results.map(item => {
        console.log(item)
        const picArray = {value:''}
        if(item.pictures.length > 1) picArray.value = item.pictures
        else picArray.value = item.pictures[0].split(',')
        item.pictures = {small: picArray.value[0], medium: picArray.value[1], big: picArray.value[2]}
        console.log(item)

        return item as Product;
      })

      return processed as Array<Product>
  } catch (error) {
      console.error('Failed to fetch product:', error);
      throw new Error('Failed to fetch product.');
  }
}

export async function getCategories(){
  noStore();
  try {
      const categories = await sql`SELECT * FROM HandcraftedHavenCategories ORDER BY name`;
      const results = categories.rows;
      console.log(results as Array<Category>)

      return results as Array<Category>;
  } catch (error) {
      console.error('Failed to fetch product:', error);
      throw new Error('Failed to fetch product.');
  }
}

export async function getXAmountTopProducts(limit: number) {
  noStore();
  try {
    const products = await sql`SELECT HandcraftedHavenProducts.*, HandcraftedHavenCategories.name as category
                                FROM HandcraftedHavenProducts
                                LEFT JOIN HandcraftedHavenCategories ON HandcraftedHavenProducts.category = HandcraftedHavenCategories.id
                                WHERE HandcraftedHavenProducts.rating = 5
                                LIMIT ${limit}`;

    const results = products.rows;
    const processed = results.map(item => {
      const picArray = {value:''}
        if(item.pictures.length > 1) picArray.value = item.pictures
        else picArray.value = item.pictures[0].split(',')
      item.pictures = { small: picArray.value[0], medium: picArray.value[1], big: picArray.value[2] };

      return item as Product;
    });

    return processed as Array<Product>;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function getArtisans(limit: number | null = null) {
  noStore();
  try {
    let query;



    if (limit) {

      query = await sql`SELECT * FROM HandcraftedHavenArtisans LIMIT ${limit}`;
    } else {
      query = await sql`SELECT * FROM HandcraftedHavenArtisans LIMIT (SELECT COUNT(*) FROM HandcraftedHavenArtisans)`
    }

    // const artisans = await query;
    const results = query.rows;


    const processed = results.map(item => {
      const picArray = {value:''}
        if(item.pictures.length > 1) picArray.value = item.pictures
        else picArray.value = item.pictures[0].split(',')
      item.pictures = { small: picArray.value[0], medium: picArray.value[1], big: picArray.value[2] };

      return item as Artisan;
    });
    console.log(processed)
    return processed as Array<Artisan>;
  } catch (error) {
    console.error('Failed to fetch artisans:', error);
    throw new Error('Failed to fetch artisans.');
  }
}
