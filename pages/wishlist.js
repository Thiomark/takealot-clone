import Layout from '@/components/Layout';
import ProductsComponent from '@/components/ProductsComponent';
import { ProductContext } from 'providers/ProductProvider';
import React, { useContext } from 'react';

const Cart = () => {
    const {list, deleteFromCart, addItemToList} = useContext(ProductContext);

    return (
        <Layout>
            <h1>Shopping Cart</h1>
            <div className='lg:flex gap-10'>
                <div className='w-full space-y-2'>
                    {list.map(item => <div key={item.id} className='bg-white pt-8 relative grid-cols-[1em_6em_1fr_1fr_6em_1em] grid-rows-[auto_auto_auto_2em_auto] grid items-stretch'>
                        <div className='flex col-start-2 row-span-3 items-center justify-center'>
                            <img className="w-auto object-cover h-20 border" src={`placeholder-images/${item.displayedImage}-placeholder.png`} alt={item.name} srcSet="" />
                        </div>
                        <h1 className='col-start-3 ml-4 col-end-6'>{item.name}</h1>
                        <h1 className='col-start-3 ml-4 col-end-6'>R {item.price}</h1> 
                        <p className='col-start-3 ml-4 col-end-6'>in stock </p>
                        <button className='text-gray-700 p-4 col-start-1 row-start-5 col-end-4 justify-center border flex items-center space-x-4'>
                            <span>Qty</span>
                        </button>
                        <button onClick={() => deleteFromCart(item.id)} className='text-gray-700 absolute top-4 right-4 flex items-center space-x-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi w-6 h-6 bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                            <span className='hidden lg:block'>Remove</span>
                        </button>
                        <button onClick={() => {
                            deleteFromCart(item.id)
                            addItemToList(item.id)}} className='text-gray-700 flex items-center space-x-4 col-start-4 col-end-7 row-start-5 border'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi lg:block hidden w-6 h-6 bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                            <span className=''>Move To List</span>
                        </button>
                    </div>)}
                </div>
                <div className='bg-white hidden sides-scale-x py-4 max-w-md w-full'>
                    <h1>Cart Summary</h1>
                    <div>
                        <p>Total: <span>(5 items)</span></p>
                        <span>R 2700</span>
                    </div>
                    <button>Proceed To Checkout</button>
                </div>
            </div>
            <ProductsComponent showMoreButton={false} showAddToCart title='Customers who bought items in your cart also bought'/>
        </Layout>
    )
}

export default Cart