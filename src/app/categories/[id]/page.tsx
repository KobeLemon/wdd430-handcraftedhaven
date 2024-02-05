import { Metadata } from 'next';
import { getProductsByCategory } from '@/app/lib/data';
import ProductList from '@/app/ui/products/ProductList';
 
export const metadata: Metadata = {
  title: 'Category'
};

export default async function Page( {

  params,

  searchParams

} : {

  params: { id: number },

  searchParams: { name: string }

} ) {

  const categoryId : number = params.id;

  const categoryName : string = searchParams.name;

  const products = await getProductsByCategory( categoryId );

  return (

    <main className='p-8 sm:p-10'>

      <h1 className='capitalize'>{ decodeURIComponent( categoryName ) }</h1>

      <ProductList products={products} />

    </main>

  );

}