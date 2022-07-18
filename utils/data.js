import { getRandomArbitrary, shuffleArray } from "./helperFunctions";

export const footerLinks = [
    {
        headerTitle: 'Account',
        links: [
            {name: 'Daily Deals'},
            {name: 'App Only Deals'},
            {name: 'Clearance Sale'},
            {name: 'Gift Vouchers'},
            {name: 'Clearance Sale'},
            {name: 'Gift Vouchers'}
        ]
    },
    {
        headerTitle: 'Account',
        links: [
            {name: 'Daily Deals'},
            {name: 'App Only Deals'},
            {name: 'Clearance Sale'},
            {name: 'Gift Vouchers'},
            {name: 'Clearance Sale'},
            {name: 'Gift Vouchers'}
        ]
    },
    {
        headerTitle: 'Account',
        links: [
            {name: 'Daily Deals'},
            {name: 'App Only Deals'},
            {name: 'Clearance Sale'},
            {name: 'Gift Vouchers'},
            {name: 'Clearance Sale'},
            {name: 'Gift Vouchers'}
        ]
    }, {
        headerTitle: 'Account',
        links: [
            {name: 'Daily Deals'},
            {name: 'App Only Deals'},
            {name: 'Clearance Sale'},
            {name: 'Gift Vouchers'},
            {name: 'Clearance Sale'},
            {name: 'Gift Vouchers'}
        ]
    }
]

export const headerPagesLinks = [
    {name: 'Home', url: '/'},
    {name: 'Shop by Category', arrow: true, url: '#'},
    {name: 'Deals', url: '#'},
    {name: 'Orders', url: '#'},
    {name: 'My Account', arrow: true, url: '/account'},
    {name: 'Help', url: '/help'}
]

export const storeItems = ['bag', 'gadgets', 'hat', 'lamp', 'shoe', 'watch']

export const generateRandomProduct = () => {
    const images = shuffleArray(storeItems).slice(0, getRandomArbitrary(2, 4));
    const titleArray = 'Lorem ipsum dolor sit amet consect adipisicing elit'

    return({
        name: titleArray.split(' ').splice(0, getRandomArbitrary(1, titleArray.split(' ').length - 1)).toString().replaceAll(',', ' '),
        price: getRandomArbitrary(60, 3000),
        oldPrice: getRandomArbitrary(60, 3000),
        sale: getRandomArbitrary(7, 35),
        rating: (Math.random() * (5 - 3) + 3).toFixed(1),
        reviews: getRandomArbitrary(10, 200),
        inStock: ['jhb', 'cpt'],
        summary: titleArray,
        images,
        productInfo: {
            categories: 'Gaming / Gaming Accessories / Controllers',
            warranty: 'Limited (12 months)',
            Platform: 'PS4',
            Barcode: getRandomArbitrary(111719874669, 911719874669)
        },
        displayedImage: images[images.length - 1]
    })
}

export const newslettersOptionsObject = [
    {
        "name": "General Newsletter",
        "checked": true
    },
    {
        "name": "Daily Deals",
        "checked": true
    },
    {
        "name": "Electronics",
        "checked": false
    },
    {
        "name": "Garden, Pool & Patio",
        "checked": false
    },
    {
        "name": "Books",
        "checked": false
    },
    {
        "name": "Movies & TV",
        "checked": false
    },
    {
        "name": "Gaming",
        "checked": false
    },
    {
        "name": "Music",
        "checked": false
    },
    {
        "name": "Afrikaans",
        "checked": false
    },
    {
        "name": "Baby & Toddler",
        "checked": false
    },
    {
        "name": "Toys",
        "checked": false
    },
    {
        "name": "Sport",
        "checked": false
    },
    {
        "name": "Camping & Outdoor",
        "checked": false
    },
    {
        "name": "Pets",
        "checked": false
    },
    {
        "name": "Luggage & Travel",
        "checked": false
    },
    {
        "name": "Home & Kitchen",
        "checked": false
    },
    {
        "name": "Office & Stationery",
        "checked": false
    },
    {
        "name": "Fashion",
        "checked": false
    },
    {
        "name": "Liquor",
        "checked": false
    },
    {
        "name": "Auto & DIY",
        "checked": false
    },
    {
        "name": "Health & Personal Care",
        "checked": false
    },
    {
        "name": "Beauty",
        "checked": false
    }
]