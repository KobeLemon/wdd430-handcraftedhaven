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



const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)

export async function POST(req: Request) {
    const file = req.body || ''

    const imageBuffer = Buffer.from(file.toString(), 'base64');

    const contentType = req.headers.get('content-type') || 'text/plain'
    const filename = `${nanoid()}.${contentType.split('/')[1]}`
    const blob = await put(filename, file, {
        contentType,
        access: 'public',
    })
    return NextResponse.json(blob)
}


function generateUUID() : string{
    return crypto.randomUUID();
}

function uploadImage(element: string){
    const input = document.querySelector(element) as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    if (file){

    }
}


async function resizeImage(inputImagePath: string, outputImagePath: string, width: number, height: number): Promise<void> {
    try{
        await sharp(inputImagePath)
        .resize(width)
        .toFile(outputImagePath)
    }catch (error:any){
        console.error('Error Resizing Image:', error.message);
    }
}