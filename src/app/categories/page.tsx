import { Metadata } from 'next';
import { getCategories } from '../lib/data';
import CategoryList from '../ui/categories/CategoryList';
 
export const metadata: Metadata = {
  title: 'Categories',
};

export default async function Page() {

  const categories = await getCategories();

  return (

    <main className='p-8 sm:p-10'>

      <h1>Categories</h1>

      <CategoryList categories={categories} />

    </main>

  );

}