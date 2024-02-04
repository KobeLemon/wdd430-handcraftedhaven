import { Metadata } from 'next';
import CategoryList from '@/app/ui/categories/CategoryList';
import { fetchProducts } from '@/app/lib/test-data';
import ProductList from '@/app/ui/products/ProductList';
 
export const metadata: Metadata = {
  title: 'Category'
};

export default async function Page( {

  params

} : {

  params: { id: number }

} ) {

  const categoryId = params.id;

  const products = await fetchProducts();

  return (

    <main>

      <h1>{ categoryId }</h1>

      <ProductList products={products} />

    </main>

  );

}