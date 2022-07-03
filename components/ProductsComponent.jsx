import React from 'react'
import ProductComponent from './ProductComponent';

const ProductsComponent = ({title}) => {

    return (
        <div>
            <div className='flex px-4 py-2 items-center justify-between'>
                <h1 className='capitalize tet-sm'>{title}</h1>
                <button className='px-4 py-2 text-sm border-[1.5px] border-gray-400'>View More</button>
            </div>
            <div className='px-4 py-2 space-x-4 flex overflow-hidden'>
                {[...Array(3)].map(product => <ProductComponent key={product}/>)}
            </div>
        </div>
    )
}

export default ProductsComponent