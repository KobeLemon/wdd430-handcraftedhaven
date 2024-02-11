import { getCategories } from "@/app/lib/data";

export async function GET( request: Request ) {

  const response = await getCategories();

  return new Response( JSON.stringify( response ) );

}