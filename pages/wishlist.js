import Layout from '@/components/Layout';
import ProductsComponent from '@/components/ProductsComponent';
import ProductHeaderComponent from '@/components/single-product/ProductHeaderComponent';
import Link from 'next/link';
import { ProductContext } from 'providers/ProductProvider';
import React, { useContext } from 'react';

const Cart = () => {
    const {list, deleteFromCart, addItemToList} = useContext(ProductContext);
    const links = ['My Account', 'My Lists', 'Wish List'];

    return (
        <Layout>
            <div className='pb-10'>
                <ProductHeaderComponent showShare={false} style={'w-full hidden md:block sides col-start-1 xl:col-end-5 col-end-3'} links={links}/>
                <div className='flex items-center justify-between sides w-full my-4 md:mt-0'>
                    <h1 className='font-bold text-sm text-gray-700'>Wish List <span className='uppercase text-[.6rem] py-1 px-2 font-semibold ml-2 bg-gray-300 rounded-full'>Default</span></h1>
                    <button className='text-gray-700 before:content flex space-x-2 items-center text-sm font-bold'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-4 h-5 bi-share-fill" viewBox="0 0 16 16">
                            < path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                        </svg>
                        <span className='hidden md:block'>Share</span> 
                    </button>
                </div>
                {list.length === 0 && <div className='sides w-full pb-6'>
                    <div className='bg-white w-full space-y-2 flex flex-col items-center justify-center py-10'>
                        <img src='wishlist.svg' className='rounded-full border-4 shadow-md border-white' />
                        <h1 className='py-3 font-bold'>This list is empty!</h1>
                        <p className='text-gray-700'>Go on, start planning what gifts you&apos;d like!</p>
                        <Link href='/'><a className='text-sm text-center text-white md:w-fit md:px-5 bg-blue-450 max-w-md md:rounded-none rounded-full w-full py-3'>Continue Shopping</a></Link>
                    </div>
                </div>}
                    
                <ProductsComponent showMoreButton={false} showAddToCart title='Trending Now'/>
            </div>
        </Layout>
    )
}

export default Cart