import Layout from '../components/Layout';
import ProductsComponent from '../components/ProductsComponent';
import ProductDescriptionComponent from '../components/single-product/ProductDescriptionComponent';
import ProductHeaderComponent from '../components/single-product/ProductHeaderComponent';
import ProductPriceComponent from '../components/single-product/ProductPriceComponent';
import ProductSummaryComponent from '../components/single-product/ProductSummaryComponent';
import ReviewsComponent from '../components/single-product/ReviewsComponent';
import { useRouter } from 'next/router';
import { generateRandomProduct } from '../utils/data';
import { ProductContext } from '../providers/ProductProvider';
import React, { useContext, useEffect } from 'react';
import FooterComponent from '../components/FooterComponent';

const ProductScreen = () => {
    const links = ['Gaming', 'Gaming Accessories', 'Controllers'];
    const {product, fetchProduct} = useContext(ProductContext);
    const router = useRouter();

    useEffect(() => {
        if(!product){
            fetchProduct(generateRandomProduct());
        }
    }, []);

    if(!product){
        return <></>;
    }

    return (
        <Layout showFooter={false} title={router.query?.id?.replaceAll('-', ' ')}>
            <div className='bg-gray-100 '>
                <div className='sides lg:grid-rows-[auto_1em_auto_auto_auto_auto_auto_auto] xl:grid-cols-[1fr_1fr_20px_minmax(300px,_auto)] pb-20 space-y-2 grid lg:grid-cols-2'> 
                    <ProductHeaderComponent style={'w-full hidden col-start-1 xl:col-end-5 col-end-3 lg:block'} links={links}/>
                    <div className='bg-white lg:-mx-4 xl:mx-0 hidden xl:row-start-2 lg:block xl:col-end-3 col-span-2 col-start-1 col-end-3 row-start-2 row-end-6'>&nbsp;</div>
                    
                    <div className='hidden lg:flex 2xl:hidden space-x-2 justify-center col-start-1 col-end-2 lg:pb-[1em] row-start-5 row-end-6'>
                        {product.images.map((img, index) => (<div key={index} onClick={() => setImage(img)} className='border border-[#dadada] w-[5em] h-[5em]'>
                            <img className='w-full cursor-pointer h-full object-cover' src={`placeholder-images/${img}-placeholder.png`}/>
                        </div>))}
                    </div>
                    <div className='shadow h-[45vh] lg:h-auto lg:shadow-none bg-white p-4 xl:row-start-2 lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-5'>
                        <div className='max-w-lg mx-auto h-full w-full lg:border border-[#dadada]'>
                            <img className='w-auto h-full mx-auto object-center object-cover' src={`placeholder-images/${product.displayedImage}-placeholder.png`}/>
                        </div>
                    </div>
                    <ProductPriceComponent
                        style={'p-4 lg:pb-0 xl:pb-4 bg-white xl:col-start-4 xl:col-end-5 xl:row-start-2 shadow lg:col-start-2 lg:col-end-3 lg:shadow-none lg:row-start-3 lg:row-end-4'}/>
                    <ProductSummaryComponent
                        style={'p-4 lg:pt-0 xl:pt-4 bg-white shadow lg:col-start-2 xl:row-start-2 lg:col-end-3 lg:shadow-none lg:row-start-4 lg:row-end-5'}/>
                    <div className='overflow-x-hidden lg:col-start-1 lg:col-span-2 xl:col-end-3'>
                        <ProductsComponent sides={false} showAddToCart showMoreButton={false} title='You Might Also Like'/> 
                    </div>
                    <ProductDescriptionComponent 
                        style={'sides-scale bg-white w-full xl:col-start-1 xl:col-end-3 lg:col-span-2 overflow-none shadow relative'} />    
                    <div className='bg-white lg:col-span-2 xl:col-start-1 xl:col-end-3'>
                        <h1 className='py-4 sides-scale-x font-bold text-gray-500'>Product Information</h1>
                        <table className='w-full text-sm'>
                            <tbody>
                                {Object.keys(product.productInfo).map((item, index) => (
                                    <tr key={index}>
                                        <th className='text-left font-semibold text-gray-500 border py-2 sides-scale-x'>{item}</th>
                                        <td className='text-left font-light text-gray-400 border py-2 sides-scale-x'>{product.productInfo[item]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <ReviewsComponent style={'sides-scale gap-10 bg-white xl:col-start-1 xl:col-end-3 shadow lg:col-span-2'}/>
                            
                    <div className='overflow-x-hidden lg:col-span-2 xl:col-start-1 xl:col-end-5'>
                        <ProductsComponent sides={false} showAddToCart showMoreButton={false} title='Customers Also Bought'/> 
                    </div>
                </div>
            </div>
            <div className='hidden lg:block'>
                <FooterComponent /> 
            </div>
        </Layout>
    )
}

export default ProductScreen