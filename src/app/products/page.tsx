import { Metadata } from 'next';
// import { faker } from '@faker-js/faker';
import ProductList from '../ui/products/ProductList';
import { fetchProducts } from '../lib/test-data';
 
export const metadata: Metadata = {
  title: 'Products',
};

// const createFakeProduct = () => ( {

//   id: faker.string.uuid(),
//   name: faker.commerce.product(),
//   category: faker.commerce.department(),
//   // description: faker.commerce.productDescription(),
//   price: +faker.commerce.price(),
//   rating: faker.number.int({ min: 1, max: 5 }),
//   imageURL: faker.image.urlLoremFlickr({ category: 'abstract', width: 500 })

// } );

// const products = Array( 50 ).fill( {} ).map( _ => createFakeProduct() );

export default async function Page() {

  const products = await fetchProducts();

  return (

    <main>

      <h1>Products</h1>

      <ProductList products={products} />

    </main>

  );

}