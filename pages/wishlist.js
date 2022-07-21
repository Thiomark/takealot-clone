import Layout from '@/components/Layout';
import ProductHeaderComponent from '@/components/single-product/ProductHeaderComponent';
import Link from 'next/link';
import { ProductContext } from 'providers/ProductProvider';
import React, { useContext } from 'react';

const Cart = () => {
    const {list, deleteFromList, addItemToCart} = useContext(ProductContext);
    const links = ['My Account', 'My Lists', 'Wish List'];

    return (
        <Layout>
            <div className='pb-10'>
                <ProductHeaderComponent showShare={false} style={'w-full hidden md:block sides col-start-1 xl:col-end-5 col-end-3'} links={links}/>
                {list.length === 0 && <div className='sides w-full pb-6'>
                    <div className='bg-white w-full space-y-2 flex flex-col items-center justify-center py-10'>
                        <img src='wishlist.svg' className='rounded-full border-4 shadow-md border-white' />
                        <h1 className='py-3 font-bold'>This list is empty!</h1>
                        <p className='text-gray-700'>Go on, start planning what gifts you&apos;d like!</p>
                        <Link href='/'><a className='text-sm text-center text-white md:w-fit md:px-5 bg-blue-450 max-w-md md:rounded-none rounded-full w-full py-3'>Continue Shopping</a></Link>
                    </div>
                </div>}
                {list.length > 0 && <div className='mb-10'>
                    <div className='lg:flex md:sides w-full'>
                    <div className='hidden lg:block space-y-3 mr-6 max-w-[300px] w-full'>
                            <div className='bg-white'>
                                <h1 className='text-lg px-4 py-2 text-gray-700 font-bold border-b'>&larr; My Lists</h1>
                                <div className='flex items-center justify-between'>
                                    <div className='border-l pt-4 w-full'>
                                        <p className='border-l-4 border-blue-450 block rounded-r-full mr-6 px-4 text-xs text-gray-750 py-2 bg-blue-50'>Wish List ({list.length})</p>
                                        <button className='w-full text-blue-450 text-xs font-semibold text-left p-4'>&#43; Create a List</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full space-y-2'>
                            <div className='flex items-center justify-between md:mx-0 mx-4 my-4 md:mt-0'>
                                <h1 className='font-bold text-sm text-gray-700'>Wish List <span className='uppercase text-[.6rem] py-1 px-2 font-semibold ml-2 bg-gray-300 rounded-full'>Default</span></h1>
                                <button className='text-gray-700 before:content flex space-x-2 items-center text-sm font-bold'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-4 h-5 bi-share-fill" viewBox="0 0 16 16">
                                        < path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                                    </svg>
                                    <span className='hidden md:block'>Share</span> 
                                </button>
                            </div>
                            {list.map(item => 
                            <div key={item.id} className='bg-white pt-8 relative grid-cols-[1em_6em_3em_1fr_6em_1em] md:grid-cols-[1em_6em_1fr_8em_3em_1em] grid-rows-[auto_auto_auto_2em_auto] md:grid-rows-[auto_auto_auto_2em_auto_1.5em] grid items-stretch'>
                                <div className='flex col-start-2 md:row-span-5 row-span-3 items-center justify-center'>
                                    <img className="w-auto object-cover h-20" src={`placeholder-images/${item.displayedImage}-placeholder.png`} alt={item.name} srcSet="" />
                                </div>
                                <h1 className='col-start-3 ml-4 md:font-semibold text-lg col-end-6 md:col-end-5 md:row-start-1'>{item.name}</h1>
                                <h1 className='col-start-3 md:col-start-4 md:row-start-1 ml-4 col-end-6 md:ml-auto md:pb-2 font-bold text-lg'>R {item.price}</h1> 
                                <div className='col-start-3 md:col-end-4 ml-4 col-end-6'>
                                    <h1 className='flex text-sm space-x-1 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi mr-2 w-4 h-4 text-yellow-400 bi-star-fill" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                        {item.rating}
                                        <span className='text-gray-700 text-xs'>({item.reviews})</span>
                                    </h1>
                                    <p className='text-sm font-bold text-gray-600'>in stock </p>
                                </div>
                                <button className='text-gray-700 md:h-10 md:col-end-5 md:row-start-4 md:m-0 md:col-start-4 p-3 md:p-0 md:mr-2 rounded-full md:rounded-none mt-0 m-4 bg-gray-200 text-sm font-semibold col-start-1 row-start-5 col-end-4 justify-center flex items-center space-x-4'>
                                    <span>Move</span>
                                </button>
                                <button onClick={() => deleteFromList(item.id)} className='text-gray-700 md:bg-gray-200 justify-center md:h-10 md:text-xs md:row-start-4 md:col-start-5 md:static absolute top-4 right-4 flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi md:w-4 md:h-4 w-6 h-6 bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                                <button onClick={() => {
                                    addItemToCart(item.id)}} className='md:text-xs rounded-full md:mb-2 md:py-3 md:rounded-none px-8 bg-green-450 mb-4 mr-4 md:mr-0 text-white md:row-start-2 md:col-start-4 md:col-end-6 text justify-center flex items-center space-x-2 col-start-4 col-end-7 row-start-5 text-sm'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi md:block w-4 h-4 bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                    <span className=''>Add to Cart</span>
                                </button>
                            </div>)}
                        </div>
                    </div>
                </div>}
            </div>
        </Layout>
    )
}

export default Cart