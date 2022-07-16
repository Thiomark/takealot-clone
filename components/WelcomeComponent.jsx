import SVGButtonComponent from "./SVGButtonComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "providers/AppProvider";

const WelcomeComponent = () => {
    const router = useRouter();
    const buttons = ["Fresh Fasion", "Appliances", "Winner", "Best Sellers", "Deals & Promotions", "Brand Store", "Clearance"];
    const shopByDepartment = ["Automotive & DIY", "Baby & Toddler", "Beauty", "Books & Courses", "Camping & Outdoor", "Cellphones & Smartwatches", "Fashion & Luggage", "Computers & Electronics", "Gaming", "Garden, Pool & Patio", "Groceries & Household", "Health & Personal Care", "Home & Appliances", "Liquor", "Office & Stationery", "Pets", "Sport & Training", "Toys", "TV, Audio & Media"]
    const {setIsMenuOpen} = useContext(AppContext);
    const [toggleShopBy, setToggleShopBy] = useState(false);

    const closeShopBy = () => {
        if(router.pathname === '/') return;
        setToggleShopBy(false);
    }

    useEffect(() => {
        if(router.pathname === '/'){
            setToggleShopBy(true);
        }else{
            setToggleShopBy(false);
        }
    }, [router])
    
    
    return (
        <div className="flex">
            <div className="flex-1 relative">
                <div className="bg-blue-450">
                    <div className="sides py-3 hidden md:block">
                        <div className="w-full lg:grid grid-rows-[1fr_1em_1fr] grid-cols-[200px_1.5em_1fr]">
                            {toggleShopBy && <ul onMouseLeave={closeShopBy} onMouseOver={() => setToggleShopBy(true)} className="bg-white cursor-pointer hidden z-50 lg:block shadow-md overflow-hidden row-start-2 absolute top-11 w-[200px]">
                                {shopByDepartment.map((button, index) => <li key={index} className="py-1 block w-full relative text-xs text-gray-700 px-4 after:content-['>'] after:text-gray-300 after:absolute after:right-2"><a href="#">{button}</a></li>)}
                                <div className="bg-green-500 p-2 text-white text-center uppercase">Daily Deals</div>
                            </ul>}
                            <button onClick={() => setToggleShopBy(prev => !prev)} onMouseLeave={closeShopBy} onMouseOver={() => setToggleShopBy(true)} className={`lg:block ${toggleShopBy ? 'rounded-b-none' : ''} hidden border-none text-xs bg-gray-750 text-white rounded`}>Shop by Department</button>
                            <div className="flex col-start-3 items-center lg:items-stretch lg:space-x-0 space-x-4">
                                <div className="lg:hidden">
                                    <SVGButtonComponent event={() => setIsMenuOpen(true)} iconStyle="h-6 w-6 text-white">
                                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                    </SVGButtonComponent>
                                </div>
                                <div className="flex flex-1">
                                    <input className="flex-1 p-1.5 text-sm rounded-l-sm border-none focus:outline-none" type="text" placeholder="Search for products, brands..." />
                                    <button className="w-fit px-6 bg-gray-250 text-xs text-gray-900">All Departments</button>
                                    <SVGButtonComponent iconStyle='h-4 w-4 text-white' btnStyle="bg-gray-750 rounded-r-sm px-4">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </SVGButtonComponent>
                                </div>
                            </div>
                            <div className={`flex ${router.pathname === "/" ? 'col-start-3' : 'col-start-1'} col-end-4 mt-3 lg:mt-0 row-start-3 divide-x-[1px] divide-gray-300`}>
                                {buttons.map((button, index) => <button className={`${index === 0 ? 'rounded-l-md' : ''} ${index === buttons.length - 1 ? 'rounded-r-md' : ''} text-xs flex-shrink flex-grow py-2 px-3 bg-gray-250`} key={index}>{button}</button>)}
                            </div>
                        </div>
                    </div>
                </div>
                {router.pathname === '/' && (
                    <div className="grid-cols-[200px_1.5em_1fr_1.5em_300px] grid-rows-[1fr_auto_auto] py-6 lg:grid sides">
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
                )}
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

export default WelcomeComponent;