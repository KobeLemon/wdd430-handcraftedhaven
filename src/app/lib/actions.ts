import * as crypto from 'crypto';
import sharp from 'sharp';
import { put } from "@vercel/blob";
import { NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid'

export const runtime = 'edge'

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