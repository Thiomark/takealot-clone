import { ProductContext } from 'providers/ProductProvider';
import React, { useContext } from 'react'

const ReviewsComponent = ({style}) => {
    const {product} = useContext(ProductContext);
    const avgRating = [16, 10, 1, 13, 2];
    const colors = ['#1c8644', '#96d900', '#fae700', '#ffa200', '#ff1800'];
    const Stars = () => <div className='flex ml-4 items-center space-x-1'>
        {[...Array(5)].map((star, index) => (
            <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-4 h-4 text-orange-300 bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>
        ))}
    </div>;

    return (
        <div className={style}>
            <div className='lg:flex lg:space-x-10'>
                <div className='w-full lg:max-w-sm'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <h1 className='font-bold text-2xl'>{product.rating}</h1>
                            <Stars />
                        </div>
                        <span className='text-xs font-semibold text-gray-750 ml-2'>{product.reviews} Reviews</span>
                    </div>
                    <ul className='my-4 space-y-4'>
                        {avgRating.map((rate, index) => 
                            (<li key={index} className={`h-2 relative flex items-center w-full`}>
                                <span className='text-xs font-semibold'>{(index - 5) * -1}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-4 mx-2 h-4 text-orange-300 bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                <div className='h-2 flex items-center w-full rounded-md bg-gray-350'>
                                    <div style={{flex: rate / 20, backgroundColor: colors[index]}} className={'rounded-md h-2 w-auto'}></div>
                                </div>
                                <span className='text-xs font-semibold w-10 text-end'>{rate}</span>
                            </li>))}   
                    </ul>
                    <div className='flex justify-end lg:justify-center'>
                        <button className='bg-transparent lg:text-white lg:bg-blue-450 lg:w-full lg:py-4 mb-6 mt-2 text-blue-450 text-sm font-bold'>Write Review</button>
                    </div>
                    <div className='hidden lg:block border-gray-250 border-2'>
                        <div className='flex p-4 items-center bg-gray-100 border-b-2 border-gray-250 justify-between'>
                            <h1>Filter by Ratings</h1>
                            <span className='text-lg'>-</span>
                        </div>
                        <div>
                            <ul className='p-3'>
                                {[...Array(5)].map((ele, index) => (<li key={index} className='flex py-2 items-center space-x-3'>
                                    <input className='' type="checkbox" />
                                    <span>{( index - 5 ) * - 1}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-4 h-4 text-orange-300 bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg>
                                </li>))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='py-3 justify-between flex items-center border-b border-gray-250'>
                        <p className='text-xs text-gray-700'>1 to 10 of {product.reviews} <span className='font-bold'>Reviews</span></p>
                        <div className='flex items-center'>
                            <p className='text-xs'>Sort by:</p>
                            <input className='bg-gray-100 text-xs py-2 px-4 ml-2' type="button" value="Most Helpful" />
                        </div>
                    </div>
                    <div className='divide-y-[1px] divide-gray-200'>
                        {[...Array(10)].map(x => <div key={x}>
                            <div className='py-5 -ml-4'>
                                <Stars />
                            </div>
                            <h1 className='text-xs font-bold pb-4'>John Doe - 06 Aug 2021</h1>
                            <p className='text-md'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, adipisci? Est, distinctio? Assumenda ad temporibus repudiandae fuga repellendus quaerat, quas unde nostrum, rem veritatis nam nemo perferendis error architecto sequi?</p>
                            <div className='flex items-center space-x-4 py-8'>
                                <button className='flex items-center space-x-2 border rounded-full py-1 px-2 text-sm text-gray-700'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-4 h-4  bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                                    </svg>
                                    <span>Helpfull</span>
                                    <span>(188)</span>
                                </button>
                                <button className='text-blue-450 font-semibold text-sm'>Report Review</button>
                            </div>
                        </div>)}
                        <div className='flex items-stretch justify-between py-6'>
                            <button className='py-3 px-6 text-sm text-gray-400 border-none bg-gray-100'>Previous</button>
                            <div className='space-x-1'>
                                {[...Array(3)].map((x, index) => <button key={index} className='py-3 px-6 text-sm border-none bg-gray-100'>{index}</button>)}
                            </div>
                            <button className='py-3 px-6 text-sm border-none bg-gray-100'>Previous</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewsComponent


