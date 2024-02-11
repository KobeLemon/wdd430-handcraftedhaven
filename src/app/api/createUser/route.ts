'use server'
import { insertUserAndArtisan } from "@/app/lib/actions";
import { randomUUID } from 'crypto';
const bcrypt = require('bcrypt');



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
    const {User, Artisan} = await req.json();

		const hashedPassword = await bcrypt.hash('123456', 10);

		const newUser = {
			id: 9,
			username: User.name.replace(/\s+/g, ''),
			email: User.email,
			password: hashedPassword
		}

		const newArtisan = {
			id: "9",
			name: Artisan.name as string,
			description: Artisan.description as string,
			collection: "",
			pictures: {
				small: Artisan.pictures as string,
				medium: Artisan.pictures as string,
				big: Artisan.pictures as string
			}
		}

		const newCollection = {
			id: randomUUID(),
			name: `${newUser.username} Items`
		}

    try {
			newArtisan.collection = newCollection.id;
			console.log('newUser:', newUser);
			console.log('newArtisan:', newArtisan);
			console.log('newCollection:', newCollection);
			await insertUserAndArtisan(newUser, newArtisan, newCollection)

			return new Response(JSON.stringify({ message: 'Artisan was created.' }),{
					status:200,
					statusText:'OK',
					headers: {
					'Content-Type': 'application/json',
					}
			})

	} catch(error){
			console.error('Error creating artisan profile:', error);
			return new Response(JSON.stringify({ message: 'Artisan failed to be created.' }),{
					status:500,
					statusText:'INTERNAL SERVER ERROR',
					headers: {
					'Content-Type': 'application/json',
					}
			})
	}
}