'use server'
import { deleteProductById} from '@/app/lib/actions'

export async function DELETE(req:Request){
    if(req.method !== 'DELETE'){
        return new Response(JSON.stringify({ message: 'Method Not Allowed' }),{
            status:200, 
            statusText:'OK', 
            headers: {
            'Content-Type': 'application/json',
            }
        });
    }
    const {id} = await req.json()
    console.log(id)

    try{
        await deleteProductById(id)
        return new Response(JSON.stringify({ message: 'Product was deleted.' }),{
            status:200, 
            statusText:'OK', 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    
    } catch(error){
        console.error('Error deleting product:', error);
        return new Response(JSON.stringify({ message: 'Product failed to delete.' }),{
            status:500, 
            statusText:'INTERNAL SERVER ERROR', 
            headers: {
            'Content-Type': 'application/json',
            }
        })
    }
}