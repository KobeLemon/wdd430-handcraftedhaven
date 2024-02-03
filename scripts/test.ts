import {sql} from '@vercel/postgres';
import {
  Product,
  User,
  Collection,
  Category,
  Artisan,
  Review
} from '../src/app/lib/definitions';
import {config} from 'dotenv'
config()

export async function getUserByEmail(email:string) {
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

export async function getProductsByCollection(collectionId: string){
  try {
      const product = await sql`SELECT * FROM HandcraftedHavenProducts WHERE collection=${collectionId}`
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


async function main() {
  const user = await getUserByEmail('ClaraKub@crafts.net');
  const artisan = await getArtisanById(1)
  const product = await getProductById('98a0481c-d0c3-48a7-a125-7f46f5d47807')
  const reviews = await getReviewsByProductId('98a0481c-d0c3-48a7-a125-7f46f5d47807')
  console.log(user)
  console.log(artisan)
  console.log(product)
}

main();