import Dexie from 'dexie';

export const db = new Dexie('KissanBazarDB');

// Define database schema matching all 8 steps & extra features
db.version(2).stores({
  users: '++id, name, role, phone, location, avatar',
  listings: '++id, farmerId, farmerName, farmerLocation, cropName, category, quantity, unit, qualityGrade, pricePerUnit, description, photoUrl, status, createdAt',
  chats: '++id, listingId, farmerId, buyerId, cropName, lastMessage, updatedAt',
  messages: '++id, chatId, senderId, senderRole, text, isOffer, offerPrice, status, timestamp',
  orders: '++id, listingId, buyerId, buyerName, farmerId, farmerName, cropName, quantity, unit, pricePerUnit, totalPrice, deliveryAddress, paymentMethod, paymentStatus, orderStatus, trackingHistory, createdAt',
  reviews: '++id, orderId, rating, comment, reviewerName, reviewerRole, targetName, createdAt',
  priceAlerts: '++id, buyerId, cropName, targetPrice, isTriggered, createdAt',
  communityPosts: '++id, authorName, authorRole, category, title, content, likes, commentsCount, createdAt',
  marketPrices: '++id, cropName, mandi, state, minPrice, maxPrice, modalPrice, trend, date'
});

// Seed data helper
export async function seedDatabase() {
  // Fix any existing listings with broken/404 photoUrls in IndexedDB
  try {
    const existingListings = await db.listings.toArray();
    for (const item of existingListings) {
      let fixedUrl = null;
      if (
        !item.photoUrl || 
        item.photoUrl.includes('photo-1598170845058-12ef4a45753b') || 
        (item.cropName && item.cropName.toLowerCase().includes('carrot'))
      ) {
        fixedUrl = '/crops/carrots.jpg';
      } else if (
        item.photoUrl.includes('photo-1615485290382-441e4d049cb5') || 
        (item.cropName && item.cropName.toLowerCase().includes('pomegranate'))
      ) {
        fixedUrl = '/crops/pomegranate.jpg';
      }

      if (fixedUrl && item.photoUrl !== fixedUrl) {
        await db.listings.update(item.id, { photoUrl: fixedUrl });
      }
    }

    // Deduplicate any accidental duplicate listings by crop & location
    const seenCrops = new Set();
    for (const item of existingListings) {
      const key = `${item.cropName}_${item.farmerLocation}_${item.pricePerUnit}`;
      if (seenCrops.has(key)) {
        await db.listings.delete(item.id);
      } else {
        seenCrops.add(key);
      }
    }
  } catch (err) {
    console.warn('Error verifying existing crop photos:', err);
  }

  // Check if new extended catalogue is already seeded (20+ crops including new vegetables and fruits)
  const hasSpinach = await db.listings.where('cropName').equals('Fresh Spinach (Palak)').count();
  const currentCount = await db.listings.count();
  if (currentCount >= 22 && hasSpinach > 0) return;

  console.log('Seeding extended crop catalogue (New Fruits, Vegetables & Pan-India Locations)...');

  // Clear existing to re-seed rich catalog
  await db.listings.clear();
  await db.users.clear();

  // Seed Farmers & Buyers across Diverse Agricultural Hubs in India
  const farmer1 = await db.users.add({
    name: 'Ramesh Patil',
    role: 'Farmer',
    phone: '+91 98230 12345',
    location: 'Nashik, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  });

  const farmer2 = await db.users.add({
    name: 'Suresh Kumar',
    role: 'Farmer',
    phone: '+91 94120 54321',
    location: 'Indore, Madhya Pradesh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  });

  const farmer3 = await db.users.add({
    name: 'Balwinder Singh',
    role: 'Farmer',
    phone: '+91 98140 88776',
    location: 'Shimla, Himachal Pradesh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const farmer4 = await db.users.add({
    name: 'Venkatesh Rao',
    role: 'Farmer',
    phone: '+91 98450 11223',
    location: 'Kolar, Karnataka',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  });

  const farmer5 = await db.users.add({
    name: 'Ghulam Nabi Dar',
    role: 'Farmer',
    phone: '+91 94190 33445',
    location: 'Srinagar, Jammu & Kashmir',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  });

  const farmer6 = await db.users.add({
    name: 'Gurpreet Singh',
    role: 'Farmer',
    phone: '+91 98765 44321',
    location: 'Ludhiana, Punjab',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80'
  });

  const farmer7 = await db.users.add({
    name: 'Manickam',
    role: 'Farmer',
    phone: '+91 94431 88776',
    location: 'Ooty, Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  });

  const farmer8 = await db.users.add({
    name: 'Rajesh Patel',
    role: 'Farmer',
    phone: '+91 98251 77665',
    location: 'Anand, Gujarat',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  });

  const farmer9 = await db.users.add({
    name: 'Subba Reddy',
    role: 'Farmer',
    phone: '+91 98480 99887',
    location: 'Guntur, Andhra Pradesh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  });

  const buyerId = await db.users.add({
    name: 'Aniket Sharma',
    role: 'Buyer',
    phone: '+91 99887 76655',
    location: 'Mumbai, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  });

  // Rich Seed Crop Listings (Expanded Vegetables, Fruits & Grains)
  await db.listings.bulkAdd([
    // Vegetables
    {
      farmerId: farmer1,
      farmerName: 'Ramesh Patil',
      farmerLocation: 'Nashik, Maharashtra',
      cropName: 'Fresh Tomatoes',
      category: 'Vegetables',
      quantity: 1200,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 20,
      description: 'Organic, farm-fresh vine-ripened red tomatoes direct from Nashik farm.',
      photoUrl: '/crops/tomatoes.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer1,
      farmerName: 'Ramesh Patil',
      farmerLocation: 'Pune, Maharashtra',
      cropName: 'Red Onions',
      category: 'Vegetables',
      quantity: 2500,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 18,
      description: 'High storage life Nasik red onions, medium-to-large size bulbs.',
      photoUrl: '/crops/onions.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer2,
      farmerName: 'Suresh Kumar',
      farmerLocation: 'Indore, Madhya Pradesh',
      cropName: 'Fresh Potatoes',
      category: 'Vegetables',
      quantity: 1800,
      unit: 'kg',
      qualityGrade: 'B Grade',
      pricePerUnit: 16,
      description: 'Cleaned table quality potatoes, uniform size suitable for bulk buyers.',
      photoUrl: '/crops/potatoes.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer9,
      farmerName: 'Subba Reddy',
      farmerLocation: 'Guntur, Andhra Pradesh',
      cropName: 'Green Chillies',
      category: 'Vegetables',
      quantity: 600,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 32,
      description: 'Spicy sharp hot green chillies harvested fresh from Guntur fields.',
      photoUrl: '/crops/chillies.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer1,
      farmerName: 'Ramesh Patil',
      farmerLocation: 'Satara, Maharashtra',
      cropName: 'Organic Carrots',
      category: 'Vegetables',
      quantity: 800,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 25,
      description: 'Sweet crunch red carrots grown organically without pesticides.',
      photoUrl: '/crops/carrots.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer2,
      farmerName: 'Suresh Kumar',
      farmerLocation: 'Udaipur, Rajasthan',
      cropName: 'Fresh Cauliflower',
      category: 'Vegetables',
      quantity: 500,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 22,
      description: 'Bright white snow-head cauliflowers, tight curds harvested fresh.',
      photoUrl: '/crops/cauliflower.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer4,
      farmerName: 'Venkatesh Rao',
      farmerLocation: 'Kolar, Karnataka',
      cropName: 'Green Capsicum (Bell Pepper)',
      category: 'Vegetables',
      quantity: 400,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 38,
      description: 'Firm thick-walled green capsicums direct from Kolar greenhouse farms.',
      photoUrl: '/crops/capsicum.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer4,
      farmerName: 'Venkatesh Rao',
      farmerLocation: 'Bengaluru Rural, Karnataka',
      cropName: 'Fresh Spinach (Palak)',
      category: 'Vegetables',
      quantity: 350,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 20,
      description: 'Tender baby green spinach leaves, washed and neatly bundled, rich in iron.',
      photoUrl: '/crops/spinach.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer7,
      farmerName: 'Manickam',
      farmerLocation: 'Ooty, Tamil Nadu',
      cropName: 'Highland Fresh Broccoli',
      category: 'Vegetables',
      quantity: 450,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 48,
      description: 'Cool-climate Nilgiris exotic dark green broccoli heads, tightly packed export grade.',
      photoUrl: '/crops/broccoli.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer6,
      farmerName: 'Gurpreet Singh',
      farmerLocation: 'Ludhiana, Punjab',
      cropName: 'Sweet Green Peas (Matar)',
      category: 'Vegetables',
      quantity: 900,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 35,
      description: 'Naturally sweet fresh pod green peas directly harvested from fertile Punjab soil.',
      photoUrl: '/crops/peas.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer8,
      farmerName: 'Rajesh Patel',
      farmerLocation: 'Anand, Gujarat',
      cropName: 'Purple Brinjal (Eggplant)',
      category: 'Vegetables',
      quantity: 700,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 24,
      description: 'Glossy deep purple tender brinjals, seedless flesh ideal for culinary markets.',
      photoUrl: '/crops/brinjal.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer2,
      farmerName: 'Suresh Kumar',
      farmerLocation: 'Chhindwara, Madhya Pradesh',
      cropName: 'Aromatic Fresh Ginger',
      category: 'Vegetables',
      quantity: 500,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 75,
      description: 'Plump pungent fresh golden ginger roots with high essential oil content.',
      photoUrl: '/crops/ginger.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer2,
      farmerName: 'Suresh Kumar',
      farmerLocation: 'Indore, Madhya Pradesh',
      cropName: 'White Pungent Garlic',
      category: 'Vegetables',
      quantity: 400,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 110,
      description: 'Sun-cured white paper-skin garlic bulbs with tight aromatic cloves.',
      photoUrl: '/crops/garlic.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },

    // Fruits
    {
      farmerId: farmer2,
      farmerName: 'Suresh Kumar',
      farmerLocation: 'Ratnagiri, Maharashtra',
      cropName: 'Alphonso Mangoes',
      category: 'Fruits',
      quantity: 1000,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 120,
      description: 'Naturally ripened GI Tagged Ratnagiri Alphonso mangoes, rich saffron pulp.',
      photoUrl: '/crops/mangoes.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer3,
      farmerName: 'Balwinder Singh',
      farmerLocation: 'Shimla, Himachal Pradesh',
      cropName: 'Royal Delicious Apples',
      category: 'Fruits',
      quantity: 3000,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 90,
      description: 'Crispy juicy red Shimla apples harvested from high altitude orchards.',
      photoUrl: '/crops/apples.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer5,
      farmerName: 'Ghulam Nabi Dar',
      farmerLocation: 'Srinagar, Jammu & Kashmir',
      cropName: 'Kashmiri Red Delicious Apples',
      category: 'Fruits',
      quantity: 2500,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 95,
      description: 'Sweet high-aroma crimson Kashmiri mountain apples from Sopore valley.',
      photoUrl: '/crops/apples.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer1,
      farmerName: 'Ramesh Patil',
      farmerLocation: 'Jalgaon, Maharashtra',
      cropName: 'Grand Naine Bananas',
      category: 'Fruits',
      quantity: 4000,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 15,
      description: 'Premium Jalgaon yellow bananas, high sweet index and long shelf life.',
      photoUrl: '/crops/bananas.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer3,
      farmerName: 'Balwinder Singh',
      farmerLocation: 'Nagpur, Maharashtra',
      cropName: 'Nagpur Oranges (Santra)',
      category: 'Fruits',
      quantity: 1500,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 45,
      description: 'Sweet tangy juicy Nagpur oranges, fresh harvest with thin peel.',
      photoUrl: '/crops/oranges.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer2,
      farmerName: 'Suresh Kumar',
      farmerLocation: 'Solapur, Maharashtra',
      cropName: 'Bhagwa Pomegranates',
      category: 'Fruits',
      quantity: 800,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 85,
      description: 'Deep red arils, sweet rich juice Bhagwa variety pomegranates.',
      photoUrl: '/crops/pomegranate.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer1,
      farmerName: 'Ramesh Patil',
      farmerLocation: 'Nashik, Maharashtra',
      cropName: 'Thompson Seedless Grapes',
      category: 'Fruits',
      quantity: 1200,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 60,
      description: 'Sweet crunchy green Thompson seedless grapes directly from Nashik vineyards.',
      photoUrl: '/crops/grapes.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer1,
      farmerName: 'Ramesh Patil',
      farmerLocation: 'Satara, Maharashtra',
      cropName: 'Mahabaleshwar Strawberries',
      category: 'Fruits',
      quantity: 300,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 140,
      description: 'Fragrant sweet red strawberries handpicked from misty Mahabaleshwar plateau.',
      photoUrl: '/crops/strawberries.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer2,
      farmerName: 'Suresh Kumar',
      farmerLocation: 'Kota, Rajasthan',
      cropName: 'Sugar-Baby Watermelon',
      category: 'Fruits',
      quantity: 3500,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 18,
      description: 'Deep red crisp-flesh watermelons, high brix sweetness and juicy texture.',
      photoUrl: '/crops/watermelon.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },
    {
      farmerId: farmer9,
      farmerName: 'Subba Reddy',
      farmerLocation: 'Anantapur, Andhra Pradesh',
      cropName: 'Sweet Golden Papaya',
      category: 'Fruits',
      quantity: 1400,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 22,
      description: 'Naturally tree-ripened golden yellow Red Lady papayas, sweet and healthy.',
      photoUrl: '/crops/papaya.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    },

    // Grains & Pulses
    {
      farmerId: farmer6,
      farmerName: 'Gurpreet Singh',
      farmerLocation: 'Khanna, Punjab',
      cropName: 'Sharbati Wheat',
      category: 'Grains',
      quantity: 5000,
      unit: 'kg',
      qualityGrade: 'A Grade',
      pricePerUnit: 35,
      description: 'Golden high protein Sharbati wheat grains, machine sorted and clean.',
      photoUrl: '/crops/wheat.jpg',
      status: 'Active',
      createdAt: new Date().toISOString()
    }
  ]);

  // Seed Market Prices across APMC Mandis
  const marketPricesCount = await db.marketPrices.count();
  if (marketPricesCount < 10) {
    await db.marketPrices.clear();
    await db.marketPrices.bulkAdd([
      { cropName: 'Tomato', mandi: 'Nashik APMC', state: 'Maharashtra', minPrice: 16, maxPrice: 22, modalPrice: 20, trend: 'up', date: 'Today' },
      { cropName: 'Tomato', mandi: 'Kolar APMC', state: 'Karnataka', minPrice: 18, maxPrice: 24, modalPrice: 21, trend: 'up', date: 'Today' },
      { cropName: 'Onion', mandi: 'Lasalgaon APMC', state: 'Maharashtra', minPrice: 14, maxPrice: 20, modalPrice: 18, trend: 'stable', date: 'Today' },
      { cropName: 'Potato', mandi: 'Indore APMC', state: 'Madhya Pradesh', minPrice: 13, maxPrice: 18, modalPrice: 16, trend: 'down', date: 'Today' },
      { cropName: 'Apple', mandi: 'Shimla APMC', state: 'Himachal Pradesh', minPrice: 75, maxPrice: 95, modalPrice: 85, trend: 'up', date: 'Today' },
      { cropName: 'Apple', mandi: 'Srinagar Mandi', state: 'Jammu & Kashmir', minPrice: 80, maxPrice: 105, modalPrice: 92, trend: 'up', date: 'Today' },
      { cropName: 'Banana', mandi: 'Jalgaon APMC', state: 'Maharashtra', minPrice: 12, maxPrice: 16, modalPrice: 14, trend: 'stable', date: 'Today' },
      { cropName: 'Wheat', mandi: 'Khanna APMC', state: 'Punjab', minPrice: 32, maxPrice: 38, modalPrice: 35, trend: 'up', date: 'Today' },
      { cropName: 'Chilli', mandi: 'Guntur APMC', state: 'Andhra Pradesh', minPrice: 28, maxPrice: 36, modalPrice: 32, trend: 'up', date: 'Today' },
      { cropName: 'Broccoli', mandi: 'Ooty APMC', state: 'Tamil Nadu', minPrice: 40, maxPrice: 55, modalPrice: 48, trend: 'stable', date: 'Today' },
      { cropName: 'Green Peas', mandi: 'Azadpur Mandi', state: 'Delhi', minPrice: 30, maxPrice: 42, modalPrice: 36, trend: 'down', date: 'Today' },
      { cropName: 'Grapes', mandi: 'Nashik APMC', state: 'Maharashtra', minPrice: 50, maxPrice: 70, modalPrice: 60, trend: 'up', date: 'Today' }
    ]);
  }

  // Seed Community Posts
  const communityCount = await db.communityPosts.count();
  if (communityCount === 0) {
    await db.communityPosts.bulkAdd([
      {
        authorName: 'Ramesh Patil',
        authorRole: 'Verified Farmer',
        category: 'Organic Farming',
        title: 'Best natural pest control for tomato crop in monsoon season',
        content: 'Using Neem oil spray mixed with soapy water every 10 days reduced leaf curl virus significantly without synthetic chemicals!',
        likes: 24,
        commentsCount: 8,
        createdAt: '2 days ago'
      },
      {
        authorName: 'Balwinder Singh',
        authorRole: 'Fruit Grower',
        category: 'Orchard Care',
        title: 'Apple harvesting tip for maximum shelf life',
        content: 'Pluck apples with stem intact in early morning hours before sun warms up the skin. Reduces bruising by 40%.',
        likes: 38,
        commentsCount: 12,
        createdAt: '1 day ago'
      },
      {
        authorName: 'Manickam',
        authorRole: 'Highland Horticulturist',
        category: 'Exotic Vegetables',
        title: 'Broccoli yield boost in Nilgiris highland weather',
        content: 'Raised beds with pine needle mulching retained optimum soil moisture and prevented root rot during heavy showers.',
        likes: 42,
        commentsCount: 15,
        createdAt: 'Just now'
      }
    ]);
  }

  console.log('Catalogue successfully updated with 24+ fruits, vegetables & pan-India locations!');
}
