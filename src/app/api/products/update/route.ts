'use server'
import { updateProductProperties } from '@/app/lib/actions'

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
    const {name, description, price, category, picture_url, id} = await req.json()
    console.log(name, description, price, category, picture_url, id)
    try{
        const pictures = [picture_url, picture_url, picture_url]
        console.log(pictures)
        await updateProductProperties(name,description,price,category,pictures, id)
        return new Response(JSON.stringify({ message: 'Product was updated.' }),{
            status:200, 
            statusText:'OK', 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    
    } catch(error){
        console.error('Error updating product:', error);
        return new Response(JSON.stringify({ message: 'Product failed to update.' }),{
            status:500, 
            statusText:'INTERNAL SERVER ERROR', 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    }
}