// Sample product data for WED e-commerce site
export const products = [
  {
    id: "prod-001",
    name: "Ash Brown Jacket",
    price: 1150.00,
    currency: "EGP",
    description: "Clean cut, timeless comfort. Essential piece for daily wear built to last beyond the season.",
    images: [
      "/img/IMG_4091.jpg",
      "/img/IMG_4095.webp",
      "/img/IMG_4098_0a62a697-8421-4a83-9cea-f70677aca4af.webp",
      "/img/IMG_4103.webp"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "jackets",
    inStock: true
  },
  {
    id: "prod-002",
    name: "Navy Jacket",
    price: 1300.00,
    currency: "EGP",
    description: "Elegant navy jacket with modern design. Perfect for any occasion.",
    images: [
      "/img/IMG_4098_0a62a697-8421-4a83-9cea-f70677aca4af.webp",
      "/img/IMG_4103.webp",
      "/img/IMG_4114.webp",
      "/img/IMG_4117.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "jackets",
    inStock: true
  },
  {
    id: "prod-003",
    name: "Essential White Tee",
    price: 450.00,
    currency: "EGP",
    description: "Classic white t-shirt made from premium cotton. A wardrobe essential.",
    images: [
      "/img/IMG_4114.webp",
      "/img/IMG_4117.jpg",
      "/img/IMG_4124.webp",
      "/img/IMG_4129.webp"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "tops",
    inStock: true
  },
  {
    id: "prod-004",
    name: "Minimalist Coat",
    price: 1850.00,
    currency: "EGP",
    description: "Sophisticated coat with clean lines. Perfect for the modern wardrobe.",
    images: [
      "/img/IMG_4124.webp",
      "/img/IMG_4129.webp",
      "/img/IMG_4130.jpg",
      "/img/IMG_4142.webp"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "coats",
    inStock: true
  },
  {
    id: "prod-005",
    name: "Classic Blazer",
    price: 1650.00,
    currency: "EGP",
    description: "Timeless blazer that elevates any outfit. Essential for every wardrobe.",
    images: [
      "/img/IMG_4130.jpg",
      "/img/IMG_4142.webp",
      "/img/IMG_4143.webp",
      "/img/IMG_4091.jpg"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "blazers",
    inStock: true
  },
  {
    id: "prod-006",
    name: "Comfort Cardigan",
    price: 950.00,
    currency: "EGP",
    description: "Soft and comfortable cardigan for everyday wear. Versatile and stylish.",
    images: [
      "/img/IMG_4143.webp",
      "/img/IMG_4091.jpg",
      "/img/IMG_4095.webp",
      "/img/IMG_4098_0a62a697-8421-4a83-9cea-f70677aca4af.webp"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "cardigans",
    inStock: true
  },
  {
    id: "prod-007",
    name: "Urban Jacket",
    price: 1450.00,
    currency: "EGP",
    description: "Modern urban jacket with functional design. Built for city life.",
    images: [
      "/img/IMG_4095.webp",
      "/img/IMG_4098_0a62a697-8421-4a83-9cea-f70677aca4af.webp",
      "/img/IMG_4103.webp",
      "/img/IMG_4114.webp"
    ],
    sizes: ["S", "M", "L", "XL"],
    category: "jackets",
    inStock: true
  },
  {
    id: "prod-008",
    name: "Essential Hoodie",
    price: 850.00,
    currency: "EGP",
    description: "Comfortable hoodie for casual days. Made with premium materials.",
    images: [
      "/img/IMG_4103.webp",
      "/img/IMG_4114.webp",
      "/img/IMG_4117.jpg",
      "/img/IMG_4124.webp"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "hoodies",
    inStock: true
  }
];

// Get featured products (first 4 for New Arrivals section)
export const getFeaturedProducts = () => {
  return products.slice(0, 4);
};

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

// Get products by category
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};
