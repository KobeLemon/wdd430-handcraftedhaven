import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArtisanById } from '../../lib/data';
import ArtisanProfile from '../../ui/artisans/artisanProfile';

export const metadata: Metadata = {
  title: 'Artisan',
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
			<ArtisanProfile

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