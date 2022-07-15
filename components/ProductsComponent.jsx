import React from 'react'
import ProductComponent from './ProductComponent';
import SVGButtonComponent from './SVGButtonComponent';

const ProductsComponent = ({title, showMoreButton = true, showAddToCart}) => {

    const buttons = 'h-10 w-10 z-50 hidden top-2/4 group-hover:flex -translate-y-2/4 absolute shadow bg-gray-750 text-white justify-center items-center rounded-full ';

    return (
        <div>
            <div className=''>
                <div className='flex py-2 items-center justify-between'>
                    <h1 className='capitalize tet-sm'>{title}</h1>
                    {showMoreButton && <button className='px-4 py-2 text-sm border-[1.5px] border-gray-400'>View More</button>}
                </div>
                <div className='py-2 gap-4 relative items-stretch group flex overflow-hidden'>
                    <SVGButtonComponent className='top-2/4' btnStyle={buttons + 'right-3'} iconStyle='h-5 w-5'>
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </SVGButtonComponent>
                    <SVGButtonComponent btnStyle={buttons + 'left-3'} iconStyle='h-5 w-5'>
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </SVGButtonComponent>
                    {[...Array(5)].map((product, index) => <ProductComponent showAddToCart={showAddToCart} key={index}/>)}
                </div>
            </div>
        </div>
    )
}

export default ProductsComponent