'use server'
import { NextApiRequest, NextApiResponse } from 'next';
import { changeArtisanImage } from '@/app/lib/actions'
import { request } from 'http';

export async function POST(req:Request){
    if(req.method !== 'POST'){
        return new Response(JSON.stringify({ message: 'Method Not Allowed' }),{
            status:200, 
            statusText:'OK', 
            headers: {
            'Content-Type': 'application/json',
            }
        });
    }
    const {url, id} = await req.json()
    console.log(url)
    console.log(id)

    try{
        const pictures = [url, url, url]
        console.log(pictures)
        await changeArtisanImage(pictures, id)
        return new Response(JSON.stringify({ message: 'Artisan image was updated.' }),{
            status:200, 
            statusText:'OK', 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    
    } catch(error){
        console.error('Error updating artisan profile:', error);
        return new Response(JSON.stringify({ message: 'Artisan image failed to update.' }),{
            status:500, 
            statusText:'INTERNAL SERVER ERROR', 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    }
}