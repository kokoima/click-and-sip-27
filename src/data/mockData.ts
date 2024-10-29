import { Establishment, Product, Zone } from '../types';

export const mockEstablishment: Establishment = {
  id: 'est1',
  name: 'The Purple Lounge',
  description: 'Premium cocktails & craft beers in a modern setting',
  images: [
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20'
  ]
};

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Craft IPA',
    description: 'Hoppy and refreshing craft beer',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13',
    category: 'Beer'
  },
  {
    id: 'p2',
    name: 'Purple Gin & Tonic',
    description: 'Premium gin with artisanal tonic water',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b',
    category: 'Cocktails',
    variants: [
      {
        id: 'v1',
        name: 'Gin Type',
        options: ['Hendricks', 'Bombay Sapphire', 'Tanqueray']
      }
    ]
  },
  {
    id: 'p3',
    name: 'Mojito',
    description: 'Classic Cuban highball',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a',
    category: 'Cocktails'
  }
];

export const mockZone: Zone = {
  id: 'z1',
  name: 'Table 12',
  type: 'table'
};