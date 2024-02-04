import { sql } from '@vercel/postgres';
import {
  Product,
  Artisan,
  Review,
  User,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUserByEmail(email:string) {
  noStore();
  try {
    const user =
      await sql`SELECT * FROM HandcraftedHavenUsers WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getArtisanById(_id: number){
  noStore();
  try {
      const artisan = await sql`SELECT * FROM HandcraftedHavenArtisans WHERE id=${_id}`
      const rawObj = artisan.rows[0];
      const picArray = JSON.parse(rawObj.pictures[0].replace("{", "[").replace("}", "]"))
      rawObj.pictures = {small: picArray[0], medium: picArray[1], big: picArray[2]}

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
      const picArray = JSON.parse(rawObj.pictures[0].replace("{", "[").replace("}", "]"))
      rawObj.pictures = {small: picArray[0], medium: picArray[1], big: picArray[2]}

      return rawObj as Product;
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
      console.log(results)
      const processed = results.map(item => item as Review);
      console.log(processed)

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
        const picArray = JSON.parse(item.pictures[0].replace("{", "[").replace("}", "]"))
        item.pictures = {small: picArray[0], medium: picArray[1], big: picArray[2]}

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
      const product = await sql`SELECT * FROM HandcraftedHavenProducts WHERE category=${categoryID}`
      const results = product.rows;
      const processed = results.map(item => {
        const picArray = JSON.parse(item.pictures[0].replace("{", "[").replace("}", "]"))
        item.pictures = {small: picArray[0], medium: picArray[1], big: picArray[2]}

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
      const picArray = JSON.parse(results.pictures[0].replace("{", "[").replace("}", "]"))
      results.pictures = {small: picArray[0], medium: picArray[1], big: picArray[2]}

      return results as Artisan
  } catch (error) {
      console.error('Failed to fetch artisan:', error);
      throw new Error('Failed to fetch artisan.');
  }
}