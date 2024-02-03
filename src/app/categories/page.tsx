import { Metadata } from 'next';
import { fetchCategories } from '../lib/test-data';
import CategoryList from '../ui/categories/CategoryList';
 
export const metadata: Metadata = {
  title: 'Categories',
};

export default async function Page() {

  const categories = await fetchCategories();

  return (

    <main>

      <h1>Categories</h1>

      <CategoryList categories={categories} />

    </main>

  );

}