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
import { isStringObject } from 'util/types';
import { randomUUID } from 'crypto';
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

export async function getProductsByCategory(categoryID: number){
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

export async function insertUserAndArtisan(user: User, artisan: Artisan, collection: Collection){
  const result = {value: {rows:[{nextval:''}]}};
  const id = {value: ''};
  try{
      result.value = await sql`SELECT nextval('handcraftedhavenusers_id_seq');`
      id.value = result.value.rows[0].nextval
      console.log(id)
      await sql`
      INSERT INTO HandcraftedHavenUsers (id, username, email, password)
      VALUES (${id.value}, ${user.username}, ${user.email}, ${user.password})
      `
  } catch (error) {
      // If a database error occurs, return a more specific error.
      console.error(error)
      return {
        message: 'Database Error: Failed to Create User.',
      };
  }
  try {
    await sql`
      INSERT INTO HandcraftedHavenCollections (id, name)
      VALUES (${collection.id}, ${collection.name})
      `
  } catch (error){
    console.error(error)
    await sql`
      DELETE FROM HandcraftedHavenUsers WHERE id=${id.value}
      `
    await sql`SELECT setval('handcraftedhavenusers_id_seq', ${id.value}, false);`
      return {
        message: 'Database Error: Failed to Create Collection.',
      };
  }
  try{
      const pictureArray: string = `{"${artisan.picture.small}","${artisan.picture.medium}","${artisan.picture.big}"}`
      await sql`
      INSERT INTO HandcraftedHavenArtisans (id, name, description, collection, pictures)
      VALUES (${id.value}, ${artisan.name}, ${artisan.description}, ${artisan.collection}, ARRAY[${pictureArray}])
      `
  } catch (error) {
    console.error(error)
      // If a database error occurs, return a more specific error.
      await sql`
      DELETE FROM HandcraftedHavenUsers WHERE id=${id.value}
      `
      await sql`
      DELETE FROM HandcraftedHavenCollections WHERE id=${collection.id}
      `
      await sql`SELECT setval('handcraftedhavenusers_id_seq', ${id.value}, false);`
      console.log('User was deleted')
      return {
        message: 'Database Error: Failed to Create Artisan.',
      };
  }
}


async function main() {
  const user = await getUserByEmail('GenevaBahringer@crafts.net');
  const artisan = await getArtisanById(1)
  const product = await getProductById('a3d13e0a-4d4f-429a-b63e-39a2e981b90c')
  const reviews = await getReviewsByProductId('a3d13e0a-4d4f-429a-b63e-39a2e981b90c')
  const productsByCollection = await getProductsByCollection('aee9ab1d-e601-474d-a0fd-33bc1fafae55')
  const productsByCategory = await getProductsByCategory(1)
  const artisanByProduct = await getArtisanByProduct(product)
  const artisanByCollectionID = await getArtisanByProduct(product.collection)
  console.log('userById:')
  console.log(user)
  console.log('artisanById:')
  console.log(artisan)
  console.log('productById:')
  console.log(product)
  console.log('reviewsFromProductId:')
  console.log(reviews)
  console.log('productsByCollection:')
  console.log(productsByCollection)
  console.log('productsByCategory:')
  console.log(productsByCategory)
  console.log('artisanByProduct:')
  console.log(artisanByProduct)
  console.log('artisanByCollectionID:')
  console.log(artisanByCollectionID)


  const newUser = {
    id: 9,
    username: "AaronBurr",
    email: "AaronBurr@crafts.net",
    password: "123456"
  }
  const newCollection = {
    id: randomUUID(),
    name: `${newUser.username} Items`
  }
  const newArtisan = {
    id: 9,
    name: "Aaron Burr",
    description: "Burr is great man.",
    collection: newCollection.id,
    picture: {
      small: "sd",
      medium: "sdsdsd",
      big: "bgfbasd"
    }
  }

  console.log('insert test.')
  const result = await insertUserAndArtisan(newUser, newArtisan, newCollection)
  console.log(result)
}

//run this to undo the test
//`DELETE FROM HandcraftedHavenUsers WHERE email=AaronBurr@crafts.net`
//`DELETE FROM HandcraftedHavenArtisans WHERE name='Aaron Burr'`
//`DELETE FROM HandcraftedHavenCollections WHERE name='AaronBurr Items'`

main();