import { getUserByEmail } from "../../lib/data";

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