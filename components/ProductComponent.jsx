import React from 'react'

const ProductComponent = () => {
  return (
    <div className='min-w-[280px] w-full'>
        <div className='h-40 bg-gray-200 w-auto mb-4'>

        </div>
        <p className='text-sm text-gray-600 pb-4'>Lorem ipsum dolor sit amet consectetur</p>
        <h1 className='text-sm font-bold mb-1'>R 300 <span className='text-xs text-gray-400 font-normal line-through ml-2'>R450</span></h1>
        <h1 className='flex text-sm space-x-1 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi mr-2 w-4 h-4 text-yellow-400 bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
            4.8
            <span className='text-gray-700 text-xs'>(200)</span>
        </h1>
    </div>
  )
}

export default ProductComponent