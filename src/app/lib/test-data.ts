import { unstable_noStore as noStore } from 'next/cache';

export async function fetchProducts() {
  noStore();

  try {

    const res = await fetch('https://fakestoreapi.com/products');

    const data = await res.json();

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

    return data;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}

export async function fetchCategories() {
  noStore();

  try {

    const res = await fetch('https://fakestoreapi.com/products/categories');

    const data = await res.json();

    return data;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories data.');
  }
}