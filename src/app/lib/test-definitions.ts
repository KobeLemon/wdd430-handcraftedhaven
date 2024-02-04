
export type Product = {
  id: string;
  title: string;
  category: string;
  description?: string;
  price: number;
  rating: number;
  image: string;
}

export type Review = {
  id: number;
  date: string;
  name: string;
  review: string;
}