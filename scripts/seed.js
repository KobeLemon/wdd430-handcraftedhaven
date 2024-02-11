const { db } = require('@vercel/postgres');
require('dotenv').config();
const {
    HandcraftedHavenCategories,
    HandcraftedHavenUsers,
    HandcraftedHavenArtisans,
    HandcraftedHavenCollections,
    HandcraftedHavenProducts,
    HandcraftedHavenReviews,
} = require('../src/app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS HandcraftedHavenUsers (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;

      console.log(`Created "HandcraftedHavenUsers" table`);

      const insertedUsers = [];

      // Insert data into the "users" table
      for(let i = 0; i < HandcraftedHavenUsers.length;i++){
        const user = HandcraftedHavenUsers[i]
        const hashedPassword = await bcrypt.hash(user.password, 10);
        insertedUsers.push(client.sql`
          INSERT INTO HandcraftedHavenUsers (username, email, password)
          VALUES (${user.username}, ${user.email}, ${hashedPassword})
          ON CONFLICT (email) DO NOTHING;
        `)
      }

      console.log(`Seeded ${insertedUsers.length} users`);

      return {
        createTable,
        users: insertedUsers,
      };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
  }

async function seedArtisans(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS HandcraftedHavenArtisans (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          collection UUID NOT NULL,
          pictures VARCHAR(500)[] NOT NULL
        );
      `;

      console.log(`Created "HandcraftedHavenArtisans" table`);
      const insertedArtisans=[]
      // Insert data into the "users" table
      for(let i = 0; i < HandcraftedHavenArtisans.length; i++){
        artisan = HandcraftedHavenArtisans[i]
        const array = `${artisan.picture.small},${artisan.picture.medium},${artisan.picture.big}`
        insertedArtisans.push(client.sql`
          INSERT INTO HandcraftedHavenArtisans (name, description, collection, pictures)
          VALUES (${artisan.name}, ${artisan.description}, ${artisan.collection}, ARRAY[${array}])
          ON CONFLICT (id) DO NOTHING;
        `);
      }

      console.log(`Seeded ${insertedArtisans.length} artisans`);

      return {
        createTable,
        artisans: insertedArtisans,
      };
    } catch (error) {
      console.error('Error seeding artisans:', error);
      throw error;
    }
  }

  async function seedCategories(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS HandcraftedHavenCategories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );
      `;

      console.log(`Created "HandcraftedHavenCategories" table`);

      // Insert data into the "users" table
      const insertedCategories = await Promise.all(
        HandcraftedHavenCategories.map(async (category) => {
          return client.sql`
            INSERT INTO HandcraftedHavenCategories (name)
            VALUES (${category.name})
            ON CONFLICT (id) DO NOTHING;
          `;
        }),
      );

      console.log(`Seeded ${insertedCategories.length} categories`);

      return {
        createTable,
        categories: insertedCategories,
      };
    } catch (error) {
      console.error('Error seeding categories:', error);
      throw error;
    }
  }

async function seedCollections(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS HandcraftedHavenCollections (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );
      `;

      console.log(`Created "HandcraftedHavenCollections" table`);

      // Insert data into the "collections" table
      const insertedCollections = await Promise.all(
        HandcraftedHavenCollections.map(async (collection) => {
          return client.sql`
          INSERT INTO HandcraftedHavenCollections (id, name)
          VALUES (${collection.id}, ${collection.name})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );

      console.log(`Seeded ${insertedCollections.length} collections`);

      return {
        createTable,
        collections: insertedCollections,
      };
    } catch (error) {
      console.error('Error seeding collections:', error);
      throw error;
    }
  }

  async function seedProducts(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS HandcraftedHavenProducts (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          price VARCHAR(20) NOT NULL,
          rating INTEGER NOT NULL,
          category INTEGER NOT NULL,
          collection UUID NOT NULL,
          artisan_id INTEGER NOT NULL,
          pictures VARCHAR(255)[] NOT NULL
        );
      `;

      console.log(`Created "HandcraftedHavenProducts" table`);

      // Insert data into the "users" table
      const insertedProducts = await Promise.all(
        HandcraftedHavenProducts.map(async (product) => {
          const array = `${product.picture.small},${product.picture.medium},${product.picture.big}`
          return client.sql`
          INSERT INTO HandcraftedHavenProducts (id, name, description, price, rating, category, collection, artisan_id, pictures)
          VALUES (${product.id}, ${product.name}, ${product.description}, ${product.price}, ${product.rating}, ${product.category}, ${product.collection}, ${product.artisan_id}, ARRAY[${array}])
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );

      console.log(`Seeded ${insertedProducts.length} products`);

      return {
        createTable,
        products: insertedProducts,
      };
    } catch (error) {
      console.error('Error seeding products:', error);
      throw error;
    }
  }

  async function seedReviews(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
      // Create the "users" table if it doesn't exist
      const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS HandcraftedHavenReviews (
          id SERIAL PRIMARY KEY,
          productId UUID NOT NULL,
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          rating INTEGER NOT NULL
        );
      `;

      console.log(`Created "HandcraftedHavenReviews" table`);

      // Insert data into the "collections" table
      const insertedReviews = await Promise.all(
        HandcraftedHavenReviews.map(async (review) => {
          return client.sql`
          INSERT INTO HandcraftedHavenReviews (productId, name, description, rating)
          VALUES (${review.productId}, ${review.name}, ${review.description}, ${review.rating})
          ON CONFLICT (id) DO NOTHING;
        `;
        }),
      );

      console.log(`Seeded ${insertedReviews.length} reviews`);

      return {
        createTable,
        reviews: insertedReviews,
      };
    } catch (error) {
      console.error('Error seeding reviews:', error);
      throw error;
    }
  }

async function main() {
    const client = await db.connect();

    await seedCategories(client);
    await seedUsers(client);
    await seedArtisans(client);
    await seedCollections(client);
    await seedProducts(client);
    await seedReviews(client);

    await client.end();
}

main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });