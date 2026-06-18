import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const users = [
  {
    firstName: 'Style',
    lastName: 'Admin',
    location: 'Mumbai, India',
    email: 'admin_trendmarket_099@trendmarket.io',
    password: 'TrendMarket!Secret#2026',
    isAdmin: true,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    location: 'Delhi, India',
    email: 'john@example.com',
    password: 'password',
  },
];

export const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const hashedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10)
    }));

    const createdUsers = await User.insertMany(hashedUsers);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = [];

    const categoryData = {
      'mobiles': {
        items: [
          { name: "Apple iPhone 13", brand: "Apple", keyword: "smartphone,apple", price: 60000 },
          { name: "Samsung Galaxy S21 FE", brand: "Samsung", keyword: "smartphone,samsung", price: 45000 },
          { name: "OnePlus 11R", brand: "OnePlus", keyword: "smartphone,oneplus", price: 40000 },
          { name: "Google Pixel 7a", brand: "Google", keyword: "smartphone,pixel", price: 44000 },
          { name: "Vivo V27 Pro", brand: "Vivo", keyword: "smartphone,vivo", price: 38000 },
          { name: "Oppo Reno 10 Pro", brand: "Oppo", keyword: "smartphone,oppo", price: 40000 },
          { name: "Motorola Edge 40", brand: "Motorola", keyword: "smartphone,motorola", price: 30000 },
          { name: "iQOO Neo 7 Pro", brand: "iQOO", keyword: "smartphone,iqoo", price: 35000 },
          { name: "Realme 11 Pro Plus", brand: "Realme", keyword: "smartphone,realme", price: 30000 },
          { name: "Xiaomi 12 Pro", brand: "Xiaomi", keyword: "smartphone,xiaomi", price: 55000 }
        ]
      },
      'Electronics': {
        items: [
          { name: "Apple AirPods Max", brand: "Apple", keyword: "headphones", price: 59900 },
          { name: "Samsung 8kg Front Load Washing Machine", brand: "Samsung", keyword: "washingmachine", price: 42000 },
          { name: "LG 1.5 Ton 5 Star Split AC", brand: "LG", keyword: "airconditioner", price: 45000 },
          { name: "Whirlpool 500L Double Door Fridge", brand: "Whirlpool", keyword: "refrigerator", price: 65000 },
          { name: "Sony WH-1000XM5 Headphones", brand: "Sony", keyword: "headphones", price: 34990 },
          { name: "Bosch 7kg Automatic Washing Machine", brand: "Bosch", keyword: "washingmachine", price: 32000 },
          { name: "Daikin 1.5 Ton Inverter AC", brand: "Daikin", keyword: "airconditioner", price: 38500 },
          { name: "Haier 320L Bottom Mount Fridge", brand: "Haier", keyword: "refrigerator", price: 34000 },
          { name: "Voltas 2 Ton Split AC", brand: "Voltas", keyword: "airconditioner", price: 48000 },
          { name: "Godrej 400L Frost Free Refrigerator", brand: "Godrej", keyword: "refrigerator", price: 52000 }
        ]
      },
      'Sports-Equipment': {
        items: [
          { name: "Nivia Classic Football", brand: "Nivia", keyword: "football", price: 5000 },
          { name: "Yonex ZR Badminton Racquet", brand: "Yonex", keyword: "badminton", price: 5500 },
          { name: "Cosco Tennis Racquet", brand: "Cosco", keyword: "tennis", price: 6000 },
          { name: "Kookaburra Cricket Bat", brand: "Kookaburra", keyword: "cricket", price: 7000 },
          { name: "Decathlon 10kg Dumbbell Set", brand: "Decathlon", keyword: "dumbbell", price: 5000 },
          { name: "Puma Cricket Kit Bag", brand: "Puma", keyword: "sportsbag", price: 6500 },
          { name: "Strauss Premium Yoga Mat", brand: "Strauss", keyword: "yogamat", price: 5000 },
          { name: "Speedo Professional Goggles", brand: "Speedo", keyword: "goggles", price: 5500 },
          { name: "Spalding Basketball", brand: "Spalding", keyword: "basketball", price: 6000 },
          { name: "Stag Table Tennis Bat", brand: "Stag", keyword: "pingpong", price: 5000 }
        ]
      },
      'Fashion': {
        items: [
          { name: 'Biba Women Kurta Set', brand: 'Biba', keyword: 'kurta', price: 3500, image: 'https://images.unsplash.com/photo-1583391733958-650fac5ef46c?w=500&q=80' },
          { name: 'Ray-Ban Aviator Sunglasses', brand: 'Ray-Ban', keyword: 'sunglasses', price: 4500, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
          { name: 'Zara Men Casual Shirt', brand: 'Zara', keyword: 'shirt', price: 2800, image: 'https://images.unsplash.com/photo-1596755094514-f87e32f08286?w=500&q=80' },
          { name: 'Nike Revolution Running Shoes', brand: 'Nike', keyword: 'sneakers', price: 5500, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
          { name: 'Tommy Hilfiger Watch', brand: 'Tommy Hilfiger', keyword: 'watch', price: 5900, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80' },
          { name: 'Levi\'s 511 Slim Jeans', brand: 'Levi\'s', keyword: 'jeans', price: 3200, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80' },
          { name: 'H&M Summer Dress', brand: 'H&M', keyword: 'dress', price: 2400, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80' },
          { name: 'Fastrack Reflex Smartwatch', brand: 'Fastrack', keyword: 'watch', price: 2900, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80' },
          { name: 'Puma Backpack', brand: 'Puma', keyword: 'backpack', price: 2100, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80' },
          { name: 'Allen Solly Formal Trousers', brand: 'Allen Solly', keyword: 'trousers', price: 2600, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80' }
        ]
      },
      'Groceries': {
        items: [
          { name: "Tata Salt, 1kg", brand: "Tata", keyword: "salt,food", price: 100 },
          { name: "Aashirvaad MP Atta, 5kg", brand: "Aashirvaad", keyword: "flour,food", price: 300 },
          { name: "Fortune Refined Oil, 1L", brand: "Fortune", keyword: "cookingoil", price: 200 },
          { name: "Maggi 2-Minute Noodles", brand: "Nestle", keyword: "noodles", price: 250 },
          { name: "Brooke Bond Tea, 500g", brand: "Brooke Bond", keyword: "tea", price: 350 },
          { name: "Nescafé Coffee, 100g", brand: "Nescafe", keyword: "coffee", price: 400 },
          { name: "India Gate Basmati, 5kg", brand: "India Gate", keyword: "rice", price: 950 },
          { name: "Surf Excel Easy Wash", brand: "Surf Excel", keyword: "detergent", price: 200 },
          { name: "Dabur Honey, 500g", brand: "Dabur", keyword: "honey", price: 350 },
          { name: "Amul Butter, 500g", brand: "Amul", keyword: "butter", price: 300 }
        ]
      }
    };

    const genders = ['Men', 'Women', 'Unisex'];
    const categories = Object.keys(categoryData);

    categories.forEach((cat) => {
      const data = categoryData[cat];
      for (let i = 0; i < 10; i++) {
        const item = data.items[i];
        const originalPrice = item.price;
        // Adjust the price slightly to create a discount
        const discount = Math.floor(Math.random() * 20 + 5); // 5% to 25% discount
        const finalPrice = Math.floor(originalPrice - (originalPrice * discount / 100));

        let imageUrl = item.image || `https://image.pollinations.ai/prompt/${encodeURIComponent(item.name + ' product photography isolated on solid white background')}?width=400&height=400&nologo=true`;
        if (item.name.includes('Tata Salt')) {
          imageUrl = 'https://m.media-amazon.com/images/I/61pD7Xk+l4L._SL1500_.jpg';
        } else if (item.name.includes('Aashirvaad MP Atta')) {
          imageUrl = 'https://m.media-amazon.com/images/I/81x2p2H+eWL._SL1500_.jpg';
        } else if (item.name.includes('India Gate Basmati')) {
          imageUrl = 'https://m.media-amazon.com/images/I/71h3Kty2AFL._SX679_.jpg';
        } else if (item.name.includes('Surf Excel Easy Wash')) {
          imageUrl = 'https://m.media-amazon.com/images/I/61gR2Gf4X6L._SX679_.jpg';
        }

        sampleProducts.push({
          name: item.name,
          image: imageUrl,
          description: `Premium quality ${item.name} from ${item.brand}. Authentic and durable.`,
          brand: item.brand,
          category: cat,
          originalPrice: originalPrice,
          discount: discount,
          price: finalPrice,
          gender: genders[Math.floor(Math.random() * genders.length)],
          countInStock: Math.floor(Math.random() * 50) + 5,
          rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 to 5.0
          numReviews: Math.floor(Math.random() * 200) + 10,
          user: adminUser,
        });
      }
    });

    await Product.insertMany(sampleProducts);
    console.log('Product data successfully imported!');
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
  }
};
