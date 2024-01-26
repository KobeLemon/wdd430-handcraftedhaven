const product = {
  id: 1,
  name: "Handcrafted Wooden Bowl",
  description:
    "Beautiful hand-carved wooden bowl made from locally sourced materials.",
  price: 45.99,
  artisanId: 1,
  materials: ["Wood"],
  category_id: 1,
  image_paths: {
    small: "/images/wooden_bowl_1.jpg",
    medium: "/images/wooden_bowl_2.jpg",
    large: "/images/wooden_bowl_3.jpg",
  },
};

const categories = [
  {
    id: 1,
    name: "Wooden Crafts",
    description: "Handcrafted items made primarily from wood.",
    image: "/images/wooden_crafts.jpg",
  },
  {
    id: 2,
    name: "Ceramics",
    description: "Artisanal pottery and ceramic creations.",
    image: "/images/ceramics.jpg",
  },
  {
    id: 3,
    name: "Textiles",
    description: "Handwoven fabrics, blankets, and pillows.",
    image: "/images/textiles.jpg",
  },
];

const artisan = {
  id: 1,
  username: "john_doe",
  email: "john.doe@example.com",
  name: "John Doe",
  avatar: "/images/john_doe_avatar.jpg",
  sso_provider: "Google",
  sso_user_id: "google123456",
  sso_access_token: "google_access_token",
  contact: "+123456789",
  Rating: 5,
  bio: "Passionate artisan creating unique handcrafted items.",
  Categories: [{ category_id: 1, category_id: 2 }],
  roles: ["artisan"],
  is_verified: true,
  is_active: true,
  created_at: "2024-01-25T12:00:00Z",
};

const reviews = [
  {
    user: "Alice",
    rating: 5,
    productId: 1,
    comment: "Absolutely stunning craftsmanship! Love it.",
  },
  {
    user: "Bob",
    rating: 4,
    productId: 2,
    comment: "Great addition to my kitchen. Very well-made.",
  },
];
