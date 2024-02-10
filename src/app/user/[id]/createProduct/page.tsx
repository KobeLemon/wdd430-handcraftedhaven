import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArtisanById, getProductsByArtisan } from '../../../lib/data';
import ArtisanProfileEdit from '../../../ui/artisans/artisanProfileEdit';
import ProductList from '@/app/ui/products/ProductList';

export const metadata: Metadata = {
  title: 'Create Product',
};

export default async function Page({ params }: { params: { id: string } }) {
	const id = params.id;
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
    </main>
  );
}