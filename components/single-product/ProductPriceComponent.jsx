import { ProductContext } from '../../providers/ProductProvider';
import React, { useContext } from 'react'
import SVGButtonComponent from '../SVGButtonComponent';
import AddToCartButtonsComponent from './AddToCartButtonsComponent';
import RatingComponent from './RatingComponent';

const ProductPriceComponent = ({style}) => {
    const {product} = useContext(ProductContext);

    return (
        <div className={style}>
            {/* <div className='router bg-white p-4 shadow lg:shadow-none space-y-2'> */}
            <div>
                <div className='flex justify-between'>
                    <h1 className='xl:hidden text-2xl'>{product.name}</h1>
                    <div className='lg:hidden'>
                        <SVGButtonComponent extraStyle='shadow'>
                            <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                        </SVGButtonComponent>
                    </div>
                </div>
                <RatingComponent reviews={product.reviews} rating={product.rating} extraStyle='my-3 xl:hidden' />
                <h1 className='text-3xl font-semibold lg:border-t xl:border-none xl:pt-0 lg:pt-4 border-gray-250'>R 1234</h1>
                <p className='text-xs font-bold uppercase text-gray-700'>Free Delivery</p>
                <p className='text-xs uppercase text-gray-600 mt-3'>eB13,750Discovery Miles 13,750</p>
                <br className='hidden'/>
                <AddToCartButtonsComponent extraStyle={'lg:hidden xl:grid'}/>
            </div>
        </div>
    )
}

export default ProductPriceComponent;