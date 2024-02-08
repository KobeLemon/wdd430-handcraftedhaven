import { Metadata } from 'next';
import ProductList from '../ui/products/ProductList';
import { getProducts } from '../lib/data';

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Page() {

  const products = await getProducts();

  return (

    <main className='p-8 sm:p-10'>

      <h1>Products</h1>

      <ProductList products={products} />

    </main>

  );

}