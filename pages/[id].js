import FooterComponent from '@/components/FooterComponent';
import HeaderComponent from '@/components/HeaderComponent';
import ProductsComponent from '@/components/ProductsComponent';
import ProductDescriptionComponent from '@/components/single-product/ProductDescriptionComponent';
import ProductHeaderComponent from '@/components/single-product/ProductHeaderComponent';
import ProductPriceComponent from '@/components/single-product/ProductPriceComponent';
import ProductSummaryComponent from '@/components/single-product/ProductSummaryComponent';
import { storeItems } from '@/utils/data';
import { getRandomArbitrary, shuffleArray } from '@/utils/helperFunctions';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ProductScreen = () => {
    const links = ['Gaming', 'Gaming Accessories', 'Controllers'];
    const router = useRouter();
    const [image, setImage] = useState('no-image');
    const [numOfImages, setnumOfImages] = useState(0);
    const [rating, setRating] =useState(0);
    const [reviews, setReviews] =useState(0);

    useEffect(() => {
        if(rating === 0){
            setRating((Math.random() * (5 - 3) + 3).toFixed(1));
            setnumOfImages(getRandomArbitrary(2, 4));
            setReviews(getRandomArbitrary(10, 200));
        }
        if(router.query['image']){
            setImage(router.query['image']);
        }
    }, [router]);

    return (
        <div>
            <HeaderComponent />
            <div className='bg-gray-100 pb-20'>
                <ProductHeaderComponent style={'sides lg:flex items-center hidden justify-between'} links={links}/>
                <div className='p-4 bg-white lg:shadow space-y-3 2xl:shadow-none xl:sides relative lg:grid lg:space-y-0 grid-cols-2 xl:grid-cols-[1fr_1fr_20px_minmax(300px,_auto)] 2xl:grid-cols-[7em_1fr_1fr_20px_minmax(300px,_auto)]'>
                    <div className='w-full xl:col-start-1 2xl:pb-0 2xl:space-y-3 2xl:row-start-1 2xl:pt-6 2xl:flex-col 2xl:space-x-0 xl:row-start-3 hidden xl:py-0 xl:pb-6 lg:flex bg-white py-3 space-x-4 items-center 2xl:items-end justify-center 2xl:justify-start order-4'>
                        {shuffleArray(storeItems).slice(0, numOfImages).map(img => (<div key={img} onClick={() => setImage(img)} className='border border-[#dadada] w-[5em] h-[5em]'>
                            <img className='w-full cursor-pointer h-full object-cover' src={`placeholder-images/${img}-placeholder.png`}/>
                        </div>))}
                    </div>
                    <div className="md:h-2/5 xl:h-full 2xl:col-start-2 row-span-2 w-full bg-white xl:p-6 2xl:px-3 h-96 lg:block flex order-1 xl:col-start-1 xl:row-end-2 xl:row-start-1" >
                        <div className="flex-1">
                            <img className='w-full h-full object-cover border border-[#dadada]' src={`placeholder-images/${image}-placeholder.png`}/>
                        </div>
                    </div>
                    <ProductPriceComponent
                        style={'w-full order-2 bg-white 2xl:col-start-5 xl:bg-transparent xl:col-start-4 xl:row-end-1 xl:row-start-1'} 
                        name={(router.query['id'])?.toString()?.replaceAll('-', ' ')}/>
                    <ProductSummaryComponent
                        style={'flex-1 2xl:px-4 2xl:pr-8 w-full space-y-4 p-4 xl:pl-0 2xl:col-start-3 bg-white order-3 xl:row-span-3 xl:col-start-2 xl:row-start-1'}
                        reviews={reviews} 
                        rating={rating} 
                        name={(router.query['id'])?.toString()?.replaceAll('-', ' ')}/>
                </div>
                <ProductDescriptionComponent 
                    style={'sides mx-4 py-8 my-4 bg-white'} />
                <ProductsComponent title='You Might Also Like'/>
            </div>
            <div className='hidden lg:block'>
                <FooterComponent /> 
            </div>
        </div>
    )
}

export default ProductScreen