/* ============================================
   PRODUCTS-DATA.JS - Product Database
   ============================================ */

const PRODUCTS_DATA = {
    boxing: {
        name: 'BOXING GEARS',
        description: 'Professional Boxing Equipment',
        image: 'boxing',
        products: [
            {
                id: 'box-001',
                name: 'Pro Style Training Gloves',
                brand: 'EVERLAST',
                category: 'boxing',
                type: 'Gloves',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.6,
                reviews: 102,
                image: 'pro-style-gloves.jpg',
                description: 'Professional-grade training gloves with superior padding'
            },
            {
                id: 'box-002',
                name: 'Professional Heavy Bag',
                brand: 'TITLE',
                category: 'boxing',
                type: 'Heavy Bags',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.3,
                reviews: 1892,
                image: 'heavy-bag.jpg',
                description: 'Durable heavy bag for intense training sessions'
            },
            {
                id: 'box-003',
                name: 'Premium Hand Wraps',
                brand: 'VENUM',
                category: 'boxing',
                type: 'Wraps',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.6,
                reviews: 192,
                image: 'hand-wraps.jpg',
                description: 'Elastic hand wraps for wrist protection and support'
            },
            {
                id: 'box-004',
                name: 'Elite Boxing Gloves',
                brand: 'TITLE',
                category: 'boxing',
                type: 'Gloves',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.8,
                reviews: 1592,
                image: 'https://tse2.mm.bing.net/th/id/OIP.rZjUmx4Q-nqSHZZmgZhaswHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
                description: 'Elite series boxing gloves for advanced training'
            },
            {
                id: 'box-005',
                name: 'Speed Bag Platform',
                brand: 'EVERLAST',
                category: 'boxing',
                type: 'Speed Bags',
                price: 4299,
                originalPrice: 5200,
                discount: 18,
                rating: 4.5,
                reviews: 156,
                image: `https://tse2.mm.bing.net/th/id/OIP.4NRNNcwTmxBp9Z0Z0jAWrgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3`,
                description: 'Professional speed bag platform set'
            },
            {
                id: 'box-006',
                name: 'Boxing Hand Tape',
                brand: 'VENUM',
                category: 'boxing',
                type: 'Wraps',
                price: 299,
                originalPrice: 399,
                discount: 25,
                rating: 4.4,
                reviews: 512,
                image: 'https://www.gosupps.com/media/catalog/product/cache/25/image/1500x/040ec09b1e35df139433887a97daa66f/8/1/81aicwaKPdS._SL1500_.jpg',
                description: 'Professional hand tape for extra wrist support'
            },
            {
                id: 'box-007',
                name: 'Heavy Bag Stand',
                brand: 'TITLE',
                category: 'boxing',
                type: 'Heavy Bags',
                price: 5999,
                originalPrice: 7299,
                discount: 18,
                rating: 4.7,
                reviews: 234,
                image: 'https://th.bing.com/th/id/OIP.VZo-VPmskv2JHXs8UqdEcgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
                description: 'Freestanding heavy bag stand'
            },
            {
                id: 'box-008',
                name: 'Double End Bag',
                brand: 'EVERLAST',
                category: 'boxing',
                type: 'Speed Bags',
                price: 1999,
                originalPrice: 2599,
                discount: 23,
                rating: 4.3,
                reviews: 89,
                image: 'https://i5.walmartimages.com/asr/cb51d3e5-38a9-4331-ab7e-74135fcd7699_1.a739ba2fe058ef785b91c931c84c64bb.jpeg?odnHeight=372&odnWidth=372&odnBg=FFFFFF',
                description: 'Double end bag for precision training'
            }
        ]
    },
    gym: {
        name: 'GYM EQUIPMENTS',
        description: 'Professional Gym & Weights Equipment',
        image: 'gym',
        products: [
            {
                id: 'gym-001',
                name: 'Adjustable Dumbbells Set',
                brand: 'POWERBLOCK',
                category: 'gym',
                type: 'Dumbbells',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.8,
                reviews: 92,
                image: 'https://tse2.mm.bing.net/th/id/OIP.AE2GBMtB69neoMbDjyboEQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3',
                description: 'Professional adjustable dumbbell set with stand'
            },
            {
                id: 'gym-002',
                name: 'Multi-Position Weight Bench',
                brand: 'ROGUE',
                category: 'gym',
                type: 'Benches',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.3,
                reviews: 1992,
                image: 'https://m.media-amazon.com/images/I/61RzmFJ6a2L._SL1500_.jpgench.jpg',
                description: 'Adjustable weight bench for full-body workouts'
            },
            {
                id: 'gym-003',
                name: 'Cast Iron Kettlebell',
                brand: 'ONNOR',
                category: 'gym',
                type: 'Kettlebells',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.6,
                reviews: 702,
                image: 'https://tse1.mm.bing.net/th/id/OIP.NReqyIvWi2_1WQdDX3mBvQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3.jpg',
                description: 'Professional-grade cast iron kettlebell'
            },
            {
                id: 'gym-004',
                name: 'Olympic Weight Barbell',
                brand: 'ELEIKO',
                category: 'gym',
                type: 'Barbells',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.8,
                reviews: 1592,
                image: 'https://img.freepik.com/premium-photo/barbell-gym_776674-536090.jpg',
                description: 'Olympic-standard weight barbell'
            },
            {
                id: 'gym-005',
                name: 'Adjustable Squat Rack',
                brand: 'ROGUE',
                category: 'gym',
                type: 'Racks',
                price: 7299,
                originalPrice: 8999,
                discount: 19,
                rating: 4.9,
                reviews: 345,
                image: 'https://th.bing.com/th/id/OIP.z5sLiktUV0HVJASth3NIVwHaFj?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3.jpg',
                description: 'Professional adjustable squat rack'
            },
            {
                id: 'gym-006',
                name: 'Leather Lifting Belt',
                brand: 'INZER',
                category: 'gym',
                type: 'Belts',
                price: 1999,
                originalPrice: 2499,
                discount: 20,
                rating: 4.7,
                reviews: 523,
                image: 'https://tse2.mm.bing.net/th/id/OIP.8rhbDAIetDB0sdJfBiVRaQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3.jpg',
                description: 'Premium leather lifting belt for support'
            },
            {
                id: 'gym-007',
                name: 'Weight Plates (Pair)',
                brand: 'STANDARD',
                category: 'gym',
                type: 'Weights',
                price: 2999,
                originalPrice: 3799,
                discount: 21,
                rating: 4.5,
                reviews: 412,
                image: 'https://image.made-in-china.com/2f0j00JvNWkLMIZtYp/Wholesale-Strength-Fitness-Equipment-Competition-Standard-Bumper-Plate-Gym-Black-Rubber-Weight-Plate.jpg.jpg',
                description: 'Standard weight plates for barbells'
            },
            {
                id: 'gym-008',
                name: 'Lifting Straps (Pair)',
                brand: 'SCHIEK',
                category: 'gym',
                type: 'Straps',
                price: 899,
                originalPrice: 1199,
                discount: 25,
                rating: 4.4,
                reviews: 189,
                image: 'https://m.media-amazon.com/images/I/71DDRGXxcXS._AC_SL1500_.jpg.jpg',
                description: 'Professional lifting straps for grip support'
            }
        ]
    },
    calisthenics: {
        name: 'CALISTHENICS GEARS',
        description: 'Bodyweight Training Equipment',
        image: 'calisthenics',
        products: [
            {
                id: 'cal-001',
                name: 'Wall-Mounted Pull-Up Bar',
                brand: 'ROGUE',
                category: 'calisthenics',
                type: 'Pull-Up Bars',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.6,
                reviews: 1592,
                image: 'https://m.media-amazon.com/images/I/61TCKpfqmWL._AC_.jpg',
                description: 'Heavy-duty wall-mounted pull-up bar'
            },
            {
                id: 'cal-002',
                name: 'Wooden Gymnastic Rings',
                brand: 'ROGUE',
                category: 'calisthenics',
                type: 'Rings',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.8,
                reviews: 1892,
                image: 'https://tse2.mm.bing.net/th/id/OIP.rDNEOzmGQBH_geAkuGRVMQHaHZ?rs=1&pid=ImgDetMain&o=7&rm=3.jpg',
                description: 'Professional wooden gymnastic rings'
            },
            {
                id: 'cal-003',
                name: 'Resistance Band Set',
                brand: 'INTERBANDS',
                category: 'calisthenics',
                type: 'Bands',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.6,
                reviews: 1192,
                image: 'https://tse3.mm.bing.net/th/id/OIP.3-2JaAl-4eQl8rcQEaT7jQHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3.jpg',
                description: 'Premium resistance bands set with multiple resistance levels'
            },
            {
                id: 'cal-004',
                name: 'Steel Parallettes',
                brand: 'ROGUE',
                category: 'calisthenics',
                type: 'Parallettes',
                price: 3299,
                originalPrice: 4100,
                discount: 20,
                rating: 4.8,
                reviews: 1892,
                image: 'https://images.squarespace-cdn.com/content/v1/623070fe0fe8996f057b8716/67c73961-9a7a-4e1c-91fd-de8c7ad4ec37/mini+parallettes.jpg?format=1000w.jpg',
                description: 'Professional steel parallettes for L-sits and push-ups'
            },
            {
                id: 'cal-005',
                name: 'Dip Bar Station',
                brand: 'ROGUE',
                category: 'calisthenics',
                type: 'Dip Bars',
                price: 4999,
                originalPrice: 6199,
                discount: 19,
                rating: 4.7,
                reviews: 412,
                image: 'https://cdn.shopify.com/s/files/1/2513/1876/files/front_lever.jpg?v=1692088972.jpg',
                description: 'Portable dip bar station for muscle-ups and dips'
            },
            {
                id: 'cal-006',
                name: 'Ab Wheel Roller',
                brand: 'PRO-STRENGTH',
                category: 'calisthenics',
                type: 'Core Training',
                price: 899,
                originalPrice: 1299,
                discount: 31,
                rating: 4.5,
                reviews: 723,
                image: 'https://tse2.mm.bing.net/th/id/OIP.Q-WqpzsOOa3b5A7XWCVE-gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3.jpg',
                description: 'Dual-wheel ab roller for core strength'
            },
            {
                id: 'cal-007',
                name: 'Suspension Trainer Pro',
                brand: 'ROGUE',
                category: 'calisthenics',
                type: 'Suspension',
                price: 2299,
                originalPrice: 2999,
                discount: 23,
                rating: 4.6,
                reviews: 589,
                image: 'https://tse1.mm.bing.net/th/id/OIP.Y25mhcTSBbj_AYonuOL5DgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3.jpg',
                description: 'Professional suspension trainer for full-body workouts'
            },
            {
                id: 'cal-008',
                name: 'Hanging Ab Straps',
                brand: 'INTERBANDS',
                category: 'calisthenics',
                type: 'Straps',
                price: 1299,
                originalPrice: 1699,
                discount: 24,
                rating: 4.4,
                reviews: 234,
                image: 'https://th.bing.com/th/id/OIP.tDyVeuieOAXQJ0f3bll-BAHaHi?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3.jpg',
                description: 'Comfortable hanging ab straps for leg raises'
            }
        ]
    }
};

// Get all unique product types for a category
function getProductTypes(category) {
    const products = PRODUCTS_DATA[category].products;
    const types = [...new Set(products.map(p => p.type))];
    return types;
}

// Filter products by category and type
function filterProducts(category, type = 'all') {
    const products = PRODUCTS_DATA[category].products;
    if (type === 'all') {
        return products;
    }
    return products.filter(p => p.type === type);
}

// Get product by ID
function getProductById(id) {
    for (const category in PRODUCTS_DATA) {
        const product = PRODUCTS_DATA[category].products.find(p => p.id === id);
        if (product) return product;
    }
    return null;
}