import { getProductById, getProducts } from "@/app/lib/data";

export async function GET( request: Request ) {

  let response;

  const { searchParams } = new URL( request.url );

  const productId = searchParams.get( 'id' ) as string;

  if ( productId ) response = await getProductById( productId );

  else response = await getProducts();

  return new Response( JSON.stringify( response ) );

}