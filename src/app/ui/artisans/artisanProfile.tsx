import Image from "next/image";
import { Artisan } from "@/app/lib/definitions";
import ProductList from '../../ui/products/ProductList';
import { getProductsByArtisan } from '../../lib/data';


export default async function ArtisanProfile({id, name, description, pictures} : Artisan) {

	const products = await getProductsByArtisan(id);
	console.log(pictures)

	return (
		<>
			<div className="flex flex-col items-center gap-4 p-16 md:flex-row md:gap-16">

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
					<h1 className="text-3xl text-center mb-1 md:text-4xl md:text-left">{name}</h1>
					<p className="text-center md:text-left">{description}</p>
				</div>

			</div>

			<div className="flex flex-col items-center justify-center border-t-2 p-5">
				<h3 className="text-xl text-center">{name}&apos;s Products</h3>
				<ProductList products={products} />
			</div>
		</>
	)
}