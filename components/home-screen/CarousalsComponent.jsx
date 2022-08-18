import React from 'react'
import { Carousel } from 'react-responsive-carousel'

const CarousalsComponent = () => {
    return (
        <div className="grid-cols-[200px_1.5em_1fr_1.5em_300px] grid-rows-[1fr_auto_auto] md:py-6 lg:grid md:sides">
            <div className="col-start-3">
                <Carousel infiniteLoop autoPlay showStatus={false} showThumbs={false}>
                    <img className="h-80 w-full object-cover bg-no-repeat" src="placeholder-images/banner-image-1.webp" />
                    <img className="h-80 w-full object-cover bg-no-repeat" src="placeholder-images/banner-image-2.webp" />
                    <img className="h-80 w-full object-cover bg-no-repeat" src="placeholder-images/banner-image-3.webp" />
                </Carousel>
            </div>
            <div className="bg-blue-100 col-start-5 hidden lg:flex shadow-md border-2 border-white items-center overflow-hidden h-20">
                <div className="bg-blue-250 rounded-full -ml-14 overflow-hidden flex items-center justify-center h-32 w-32">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-16 h-16 bi-truck" viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                </div>
                <div className="p-2 px-4 flex-1">
                    <h1 className="text-sm font-semibold">Where&apos;s my order?</h1>
                    <p className="text-xs text-gray-700">Check your delivery or collection status.</p>
                </div>
            </div>
            <h1 className="col-start-3 hidden lg:block font-semibold text-gray-700 mt-2 row-start-2">Featured Brands</h1>
            <div className="hidden lg:block col-start-3 row-start-3">
                <FeaturedBrands />
            </div>
        </div>
    )
}

const FeaturedBrands = () => {
    return (
        <div className="h-16 relative flex justify-center items-center space-x-6 overflow-x-hidden">
            <button className="rounded-full absolute left-2 flex items-center justify-center h-10 w-10 shadow-[0_0_6px_0px_rgba(0,0,0,.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi h-6 w-6 bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>
            <img src="canon.webp" className="h-full w-auto" alt="" />
            <img src="mac.webp" className="h-full w-auto" alt="" />
            <img src="canon.webp" className="h-full w-auto" alt="" />
            <button className="rounded-full absolute right-2 flex items-center justify-center h-10 w-10 shadow-[0_0_6px_0px_rgba(0,0,0,.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi h-6 w-6 bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
    )
}

export default CarousalsComponent