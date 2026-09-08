// ─────────────────────────────────────────────────────────────
//  Your catalog. Add / edit products here — that's all it takes.
//  `image` can be a URL or a file you drop in the /public folder
//  (e.g. put bunny.jpg in /public and use image: '/bunny.jpg').
//  Categories drive the filter buttons on the catalog automatically.
// ─────────────────────────────────────────────────────────────

export const categories = ['All', 'Amigurumi', 'Bags', 'Accessories', 'Home decor']

export const products = [
  {
    id: 'bunny',
    name: 'Cuddle Bunny',
    category: 'Amigurumi',
    price: '₹499',
    madeToOrder: true,
    color: '#FFD1DC',
    image: '',
    description: 'A squishy little bunny with a bobble tail. Choose your colour.',
  },
  {
    id: 'bear',
    name: 'Honey Bear',
    category: 'Amigurumi',
    price: '₹649',
    madeToOrder: true,
    color: '#FCE38A',
    image: '',
    description: 'Chunky, huggable bear in soft cotton yarn.',
  },
  {
    id: 'tote',
    name: 'Granny-Square Tote',
    category: 'Bags',
    price: '₹899',
    madeToOrder: true,
    color: '#B5D8CC',
    image: '',
    description: 'Classic granny squares in a roomy everyday tote.',
  },
  {
    id: 'clutch',
    name: 'Scallop Clutch',
    category: 'Bags',
    price: '₹749',
    madeToOrder: true,
    color: '#A6C1EE',
    image: '',
    description: 'A dainty scalloped clutch for special days.',
  },
  {
    id: 'beanie',
    name: 'Pom-Pom Beanie',
    category: 'Accessories',
    price: '₹399',
    madeToOrder: true,
    color: '#FFD1DC',
    image: '',
    description: 'Warm ribbed beanie topped with a fluffy pom-pom.',
  },
  {
    id: 'scrunchie',
    name: 'Scrunchie Set',
    category: 'Accessories',
    price: '₹249',
    madeToOrder: false,
    color: '#FCE38A',
    image: '',
    description: 'A trio of soft scrunchies in your chosen palette.',
  },
  {
    id: 'coasters',
    name: 'Daisy Coasters',
    category: 'Home decor',
    price: '₹399',
    madeToOrder: true,
    color: '#B5D8CC',
    image: '',
    description: 'Set of four cheerful daisy coasters.',
  },
  {
    id: 'garland',
    name: 'Cloud Garland',
    category: 'Home decor',
    price: '₹599',
    madeToOrder: true,
    color: '#A6C1EE',
    image: '',
    description: 'Pastel cloud bunting for a dreamy nursery or nook.',
  },
]
