import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArtisanById, getCategories, getProductsByArtisan } from '../../lib/data';
import ArtisanProfileEdit from '../../ui/artisans/artisanProfileEdit';
import ProductList from '@/app/ui/products/ProductList';
import CreateProductButton from '@/app/ui/products/productContainerButton';
import ProductListEdit from '@/app/ui/products/ProductListEdit';

export const metadata: Metadata = {
  title: 'User Profile',
};

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
	const products = await getProductsByArtisan(id);
	const categories = await getCategories()
	const [artisan] = await Promise.all([
    getArtisanById(id),
  ]);

	if (!artisan) {
		notFound();
	}

  return (
    <main>
			<ArtisanProfileEdit

				key={artisan.id}

				id={artisan.id}

				name={artisan.name}

				pictures={artisan.pictures}

				description={artisan.description}

				collection=""

			/>
			<div className="flex flex-col items-center justify-center border-t-2 p-5">
				<h3 className="text-xl text-center">Your Products</h3>
				<CreateProductButton id={artisan.id} collection={artisan.collection} categories={categories}/>
				<ProductListEdit products={products} categories={categories}/>
			</div>
    </main>
  );
}