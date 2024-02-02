import { Metadata } from 'next';
import { faker } from '@faker-js/faker';
import ProductList from '../ui/products/ProductList';
 
export const metadata: Metadata = {
  title: 'Products',
};

const createFakeProduct = () => ( {

  id: faker.string.uuid(),
  name: faker.commerce.product(),
  category: faker.commerce.department(),
  // description: faker.commerce.productDescription(),
  price: +faker.commerce.price(),
  rating: faker.number.int({ min: 1, max: 5 }),
  imageURL: faker.image.urlLoremFlickr({ category: 'abstract', width: 500 })

} );

// for (let index = 0; index < 10; index++) {
//   console.log(createFakeProduct());  
// }

const products = Array( 50 ).fill( {} ).map( _ => createFakeProduct() );

// console.log(products, 'HERE')

// const test = {
//   id: 'ffadb453ab8b24ed8d191ed5',
//   name: 'Chips',
//   category: 'garden',
//   description: 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
//   rating: 3,

//   price: '804.00',
//   imageURL: 'https://loremflickr.com/640/480/abstract?lock=3054974621712384'
// };

export default function Page() {

  return (

    <main>

      <h1>Products</h1>

      <ProductList products={products} />

    </main>

  );

}