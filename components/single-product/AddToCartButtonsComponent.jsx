import { ProductContext } from '../../providers/ProductProvider';
import React, { useContext } from 'react'

const AddToCartButtonsComponent = ({extraStyle}) => {
    const { addItemToCart, product, addItemToList } = useContext(ProductContext);

    return (
        <div className={`fixed lg:grid-cols-1 lg:mt-4 lg:p-0 z-30 xl:p-0 xl:grid-cols-1 lg:relative grid grid-cols-2 gap-2 bottom-0 right-0 left-0 bg-white p-4 w-full ${extraStyle}`}>
            <button onClick={() => addItemToCart(product)} className='flex text-sm font-bold items-center justify-center space-x-2 text-white bg-green-450 w-full p-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi h-5 w-5 bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span>Add to Cart</span>
            </button>
            <button onClick={() => addItemToList(product)} className='flex text-sm font-bold items-center justify-center space-x-2 text-black bg-gray-300 w-full p-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi h-5 w-5 bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
                <span>Add to List</span>
            </button>
        </div>
    )
}

export default AddToCartButtonsComponent