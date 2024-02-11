'use server'
import { NextApiRequest, NextApiResponse } from 'next';
import { createProduct, updateArtisanProperties } from '@/app/lib/actions'
import { request } from 'http';


export async function POST(req:Request){
    if(req.method !== 'POST'){
        return new Response(JSON.stringify({ message: 'Method Not Allowed' }),{
            status:500, 
            statusText:'Internal Server Error', 
            headers: {
            'Content-Type': 'application/json',
            }
        });
    }
    const {name, description, price, category, collection, artisan_id, picture_url} = await req.json()

    try{
        const pictures = [picture_url, picture_url, picture_url]
        console.log(pictures)
        await createProduct(name,description,price,category,collection,artisan_id,pictures)

        return new Response(JSON.stringify({ message: 'Product was created.' }),{
            status:200, 
            statusText:'OK', 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    
    } catch(error){
        console.error('Error creating product profile:', error);
        return new Response(JSON.stringify({ message: 'Product failed to be created.' }),{
            status:500, 
            statusText:'INTERNAL SERVER ERROR', 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    }
}