import { getUserByEmail } from "../../lib/data";

export async function POST(req:Request){
	if(req.method !== 'POST'){
			return new Response('',{
					status:200,
					statusText:'OK',
					headers: {
					'Content-Type': 'text/plain',
					}
			});
	}
	const email = await req.json()

	try{
			console.log(email)
			const user = await getUserByEmail(email)
			console.log(user);
			return new Response(JSON.stringify(user),{
					status:200,
					statusText:'OK',
					headers: {
					'Content-Type': 'application/json',
					}
			})

	} catch(error){
			console.error('Error requesting artisan profile:', error);
			return new Response('',{
					status:500,
					statusText:'INTERNAL SERVER ERROR',
					headers: {
					'Content-Type': 'text/plain',
					}
			})
	}
}