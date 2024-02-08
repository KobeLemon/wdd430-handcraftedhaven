import Image from "next/image";
import { Artisan } from "@/app/lib/definitions";
import ProductList from '../../ui/products/ProductList';
import { getProducts, getProductsByArtisan } from '../../lib/data';


export default async function ArtisanProfile({id, name, description, pictures} : Artisan) {

	const products = await getProductsByArtisan(id);

	return (
		<>
			<div className="flex items-center gap-16 p-16">

				<div className="relative aspect-video md:aspect-square">
					<Image
						className="object-cover rounded-full"
						src={pictures.big}
						alt={`${name}'s Avatar`}
						width={200}
						height={200}
					/>
				</div>

				<div className="py-4">
					<h1 className="text-4xl">{name}</h1>
					<h2 className="text-xl text-center">{description}</h2>
				</div>

			</div>

			<div className="border-t-2 p-5">
				<h3 className="text-xl text-center">{name}&apos;s Products</h3>
				<ProductList products={products} />
			</div>
		</>
	)
}