// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  category: string;
  collection: string;
  pictures: {
    small: string;
    medium: string;
    big: string;
  };
	category_name: string;
	artisan_name: string;
}

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type ArtisanUser = {
	id: string;
  name: string;
  description: string;
  collection: string;
  pictures: {
    small: string;
    medium:string;
    big:   string;
  };
  email: string;
}

export type Collection = {
  id: string;
  name: string;
}

export type Category = {
  id: number;
  name: string;
  // picture: {
  //   small: string;
  //   medium:string;
  //   big:   string;
  // };
}

export type Artisan = {
  id: string;
  name: string;
  description: string;
  collection: string;
  pictures: {
    small: string;
    medium:string;
    big:   string;
  };
};

export type Review = {
  id: string;
  productid: string;
  name: string;
  description: string;
  rating: number;
}