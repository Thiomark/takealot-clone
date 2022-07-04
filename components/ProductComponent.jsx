import { useEffect, useState } from "react";

const ProductComponent = () => {
    const [price, setPrice] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [rating, setRating] =useState(0);
    const [reviews, setReviews] =useState(0);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(null);
    const [sale, setSale] = useState(0);
    const getRandomArbitrary = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const placeHolderImages = ['bag', 'gadgets', 'hat', 'lamp', 'shoe', 'watch']
    const titleArray = 'Lorem ipsum dolor sit amet consect adipisicing elit'

    useEffect(() => {
        setPrice(getRandomArbitrary(60, 3000));
        setOldPrice(getRandomArbitrary(60, 3000));
        setSale(getRandomArbitrary(7, 35));
        setRating((Math.random() * (5 - 3) + 3).toFixed(1));
        setImage(placeHolderImages[getRandomArbitrary(0, placeHolderImages.length -1)]);
        setTitle(titleArray.split(' ').splice(0, getRandomArbitrary(1, titleArray.split(' ').length - 1)).toString().replaceAll(',', ' '))
        setReviews(getRandomArbitrary(10, 200));
    }, [])
    

    return (
        <div className='min-w-[280px] w-full bg-white p-4'>
            <div className='md:h-64 h-52 justify-center items-center relative bg-gray-200 mb-4'>
                {oldPrice > price && <span className="bg-blue-450 p-2 absolute top-0 left-0 font-bold text-xs text-white h-12 w-12 z-20 rounded text-center flex items-center">{sale} % off</span>}
                <img className="w-full absolute h-full" src={`placeholder-images/${image}-placeholder.png`} alt="" srcSet="" />
            </div>
            <p className='text-sm text-gray-600 pb-4'>{title}</p>
            <h1 className='text-sm font-bold mb-1'>R {price} {oldPrice > price && <span className='text-xs text-gray-400 font-normal line-through ml-2'>R {oldPrice}</span>}</h1>
            <h1 className='flex text-sm space-x-1 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi mr-2 w-4 h-4 text-yellow-400 bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                {rating}
                <span className='text-gray-700 text-xs'>({reviews})</span>
            </h1>
        </div>
    )
}

export default ProductComponent