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