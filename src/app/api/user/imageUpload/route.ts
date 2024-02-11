'use server'
import { put } from "@vercel/blob";
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)

customAlphabet

export async function POST(req: Request) {
    const file = req.body || ''
    console.log(file)

    const contentType = req.headers.get('content-type') || 'image/jpg'
    const filename = `${nanoid()}.${contentType.split('/')[1]}`
    const blob = await put(filename, file, {
        contentType,
        access: 'public',
    })
    console.log(blob)
    return new Response(blob.url,{
        status:200, 
        statusText:'OK', 
        headers: {
        'Content-Type': 'text/plain',
        },
    });
}

    // try{
    //     const pictures = [picture, picture, picture]
    //     console.log(pictures)
    //     await updateArtisanProperties(name,description,pictures,id)
    //     return new Response(JSON.stringify({ message: 'Artisan profile was updated.' }),{
    //         status:200, 
    //         statusText:'OK', 
    //         headers: {
    //         'Content-Type': 'application/json',
    //         }
    //     })
    
    // } catch(error){
    //     console.error('Error updating artisan profile:', error);
    //     return new Response(JSON.stringify({ message: 'Artisan profile failed to update.' }),{
    //         status:500, 
    //         statusText:'INTERNAL SERVER ERROR', 
    //         headers: {
    //         'Content-Type': 'application/json',
    //         }
    //     })
    // }
//}