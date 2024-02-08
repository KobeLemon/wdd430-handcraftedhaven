import { Metadata } from 'next';
import { getArtisans } from '../lib/data';
import ArtisansList from '../ui/artisans/artisansList';

export const metadata: Metadata = {
  title: 'Artisans',
};

export default async function Page() {
  const artisans = await getArtisans()
  return (
    <div className='p-10'>
      <h1 className='sm:text-2xl md:text-6xl'>Artisans</h1>

      <ArtisansList artisans={artisans}/>
    </div>
  );
}