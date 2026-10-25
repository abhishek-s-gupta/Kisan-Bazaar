export const CROP_LOCAL_IMAGES = {
  carrots: '/crops/carrots.jpg',
  pomegranate: '/crops/pomegranate.jpg',
  tomatoes: '/crops/tomatoes.jpg',
  onions: '/crops/onions.jpg',
  potatoes: '/crops/potatoes.jpg',
  chillies: '/crops/chillies.jpg',
  cauliflower: '/crops/cauliflower.jpg',
  capsicum: '/crops/capsicum.jpg',
  mangoes: '/crops/mangoes.jpg',
  apples: '/crops/apples.jpg',
  bananas: '/crops/bananas.jpg',
  oranges: '/crops/oranges.jpg',
  wheat: '/crops/wheat.jpg',
  spinach: '/crops/spinach.jpg',
  broccoli: '/crops/broccoli.jpg',
  peas: '/crops/peas.jpg',
  brinjal: '/crops/brinjal.jpg',
  grapes: '/crops/grapes.jpg',
  strawberries: '/crops/strawberries.jpg',
  watermelon: '/crops/watermelon.jpg',
  papaya: '/crops/papaya.jpg',
  ginger: '/crops/ginger.jpg',
  garlic: '/crops/garlic.jpg'
};

// Verified working online fallback URLs
export const CROP_ONLINE_IMAGES = {
  carrots: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=500&auto=format&fit=crop&q=80',
  pomegranate: '/crops/pomegranate.jpg',
  tomatoes: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80',
  onions: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80',
  potatoes: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80',
  chillies: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=80',
  cauliflower: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=500&auto=format&fit=crop&q=80',
  capsicum: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&auto=format&fit=crop&q=80',
  mangoes: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&auto=format&fit=crop&q=80',
  apples: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=80',
  bananas: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=80',
  oranges: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500&auto=format&fit=crop&q=80',
  wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80',
  spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=80',
  broccoli: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500&auto=format&fit=crop&q=80',
  peas: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=500&auto=format&fit=crop&q=80',
  brinjal: '/crops/brinjal.jpg',
  grapes: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&auto=format&fit=crop&q=80',
  strawberries: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500&auto=format&fit=crop&q=80',
  watermelon: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80',
  papaya: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=500&auto=format&fit=crop&q=80',
  ginger: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=80',
  garlic: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=500&auto=format&fit=crop&q=80'
};

// Known broken or incorrect photo IDs
const KNOWN_BROKEN_PATTERNS = [
  'photo-1598170845058-12ef4a45753b', // 404 Carrot Unsplash image
  'photo-1615485290382-441e4d049cb5'  // Romanesco/broccoli mistakenly used for Pomegranate
];

export function getCropImageFallback(cropName = '', category = '') {
  const name = String(cropName).toLowerCase();

  // Vegetables
  if (name.includes('carrot')) return '/crops/carrots.jpg';
  if (name.includes('spinach') || name.includes('palak')) return '/crops/spinach.jpg';
  if (name.includes('broccoli')) return '/crops/broccoli.jpg';
  if (name.includes('pea') || name.includes('matar')) return '/crops/peas.jpg';
  if (name.includes('brinjal') || name.includes('eggplant') || name.includes('baingan')) return '/crops/brinjal.jpg';
  if (name.includes('ginger') || name.includes('adrak')) return '/crops/ginger.jpg';
  if (name.includes('garlic') || name.includes('lahsun')) return '/crops/garlic.jpg';
  if (name.includes('tomato')) return '/crops/tomatoes.jpg';
  if (name.includes('onion')) return '/crops/onions.jpg';
  if (name.includes('potato')) return '/crops/potatoes.jpg';
  if (name.includes('chilli') || name.includes('chili')) return '/crops/chillies.jpg';
  if (name.includes('cauliflower')) return '/crops/cauliflower.jpg';
  if (name.includes('capsicum') || name.includes('pepper')) return '/crops/capsicum.jpg';

  // Fruits
  if (name.includes('pomegranate') || name.includes('anar')) return '/crops/pomegranate.jpg';
  if (name.includes('grape') || name.includes('angoor')) return '/crops/grapes.jpg';
  if (name.includes('strawberr')) return '/crops/strawberries.jpg';
  if (name.includes('watermelon') || name.includes('tarbooz')) return '/crops/watermelon.jpg';
  if (name.includes('papaya') || name.includes('papita')) return '/crops/papaya.jpg';
  if (name.includes('mango')) return '/crops/mangoes.jpg';
  if (name.includes('apple')) return '/crops/apples.jpg';
  if (name.includes('banana')) return '/crops/bananas.jpg';
  if (name.includes('orange') || name.includes('santra')) return '/crops/oranges.jpg';

  // Grains
  if (name.includes('wheat') || name.includes('grain')) return '/crops/wheat.jpg';

  if (category === 'Fruits') return '/crops/apples.jpg';
  if (category === 'Grains') return '/crops/wheat.jpg';
  return '/crops/tomatoes.jpg';
}

export function resolveCropImageUrl(photoUrl, cropName = '', category = '') {
  if (!photoUrl) {
    return getCropImageFallback(cropName, category);
  }

  // If the photoUrl matches known dead or incorrect URLs, immediately fix it
  for (const pattern of KNOWN_BROKEN_PATTERNS) {
    if (photoUrl.includes(pattern)) {
      return getCropImageFallback(cropName, category);
    }
  }

  return photoUrl;
}
