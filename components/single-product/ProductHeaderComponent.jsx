import React from 'react';
import Link from 'next/link';

const ProductHeaderComponent = ({links, style}) => {
    return (
        <div className={style}>
            <div className='flex w-full items-center justify-between'>
                <div className='flex items-center py-4'>
                    {links.map((x, index) => <Link href='#' key={x}><a className={`text-sm hover:underline text-blue-450 ${index < links.length - 1 && 'after:content-["/"] after:mx-4'}`}>{x}</a></Link>)}
                </div>
                <button className='text-gray-700 before:content flex items-center text-sm font-bold'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi mr-2 w-4 h-5 bi-share-fill" viewBox="0 0 16 16">
                        < path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"/>
                    </svg>Share 
                </button>
            </div>
        </div>
    )
}

export default ProductHeaderComponent;