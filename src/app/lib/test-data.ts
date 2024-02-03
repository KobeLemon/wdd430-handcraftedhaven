import { unstable_noStore as noStore } from 'next/cache';

export async function fetchProducts() {
  noStore();

  try {

    const res = await fetch('https://fakestoreapi.com/products');

    const data = await res.json();

    // console.log(data);

    return data;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}

export async function fetchProductById( id: number ) {
  noStore();

  try {

    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    const data = await res.json();

    // console.log(data);

    return data;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}