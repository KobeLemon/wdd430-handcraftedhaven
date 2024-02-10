import * as crypto from 'crypto';
import sharp from 'sharp';
import { put } from "@vercel/blob";
import { NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid'
import { sql } from '@vercel/postgres';
import {
    Product,
    Artisan,
    Review,
    User,
    Collection,
  } from './definitions';

export const runtime = 'edge'

export async function updateArtisanProperties(name:string, description:string, pictures:Array<string>, id:string|number){
  try {
    const query = {
      text: `UPDATE handcraftedhavenartisans SET name = $1, description = $2, pictures = $3 WHERE id= $4`,
      values: [name, description, pictures, id]
    }
    sql.query(query)
  } catch(error) {
    console.log('error occurred')
    console.error(error)
  }
}

export async function changeArtisanImage(value:Array<string>, id:number){
  try {
    const query = {
      text: `UPDATE handcraftedhavenartisans SET pictures = $1 WHERE id= $2`,
      values: [value, id]
    }
    sql.query(query)
  } catch(error) {
    console.log('error occurred')
    console.error(error)
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
        const pictureArray: string = `{"${artisan.pictures.small}","${artisan.pictures.medium}","${artisan.pictures.big}"}`
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