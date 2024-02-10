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