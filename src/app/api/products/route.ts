import { getProductById } from "@/app/lib/data";

export async function GET( request: Request ) {

  const { searchParams } = new URL( request.url );

  const productId = searchParams.get( 'id' ) as string;

  const product = await getProductById( productId );

  return new Response( JSON.stringify( product ) );

}