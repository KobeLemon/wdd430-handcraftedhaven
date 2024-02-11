'use server'
import { updateArtisanProperties } from '@/app/lib/actions'

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
    const {name, description, picture, id} = await req.json()

    try{
        const pictures = [picture, picture, picture]
        console.log(pictures)
        await updateArtisanProperties(name,description,pictures,id)
        return new Response(JSON.stringify({ message: 'Artisan profile was updated.' }),{
            status:200, 
            statusText:'OK', 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    
    } catch(error){
        console.error('Error updating artisan profile:', error);
        return new Response(JSON.stringify({ message: 'Artisan profile failed to update.' }),{
            status:500, 
            statusText:'INTERNAL SERVER ERROR', 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    }
}