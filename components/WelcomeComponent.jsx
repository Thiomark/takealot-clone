import CarousalComponent from "./CarousalComponent";
import SVGButtonComponent from "./SVGButtonComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const WelcomeComponent = () => {
    const buttons = ['Fresh Fasion', 'Appliances', 'Winner', 'Best Sellers', 'Deals & Promotions', 'Brand Store', 'Clearance'];
    const shopByDepartment = ['Automotive & DIY', 'Baby & Toddler', 'Beauty', 'Books & Courses', 'Camping & Outdoor', 'Cellphones & Smartwatches', 'Fashion & Luggage', 'Computers & Electronics', 'Gaming', 'Garden, Pool & Patio', 'Groceries & Household', 'Health & Personal Care', 'Home & Appliances', 'Liquor', 'Office & Stationery', 'Pets', 'Sport & Training', 'Toys', 'TV, Audio & Media']

    return (
        <div className="flex">
            <div className="flex-1 relative">
                <div className="grid grid-cols-5 md:hidden ">
                    <div className="h-60 col-span-3 bg-slate-600">
                        <img className="w-full object-cover h-full" src="https://images.pexels.com/photos/5622888/pexels-photo-5622888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                    </div>
                    <div className="h-60 grid grid-cols-1 grid-rows-2 col-span-2">
                        <img className="w-full h-full" src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        <img className="w-full h-full" src="https://images.pexels.com/photos/5887647/pexels-photo-5887647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                    </div>
                </div>
                <div className="bg-blue-450">
                    <div className="sides py-3 hidden lg:space-x-4 md:block lg:flex">
                        <div className="hidden lg:block">
                            <button className="w-[250px] text-xs bg-gray-750 text-white p-3 rounded">Shop by Department</button>
                            <ul className="bg-white shadow overflow-hidden top-0 mt-12 w-[250px] bottom-4 absolute">
                                {shopByDepartment.map((button, index) => <li key={index} className="py-1 block w-full relative text-sm px-4 after:content-['>'] after:absolute after:right-2"><a href="#">{button}</a></li>)}
                            </ul>
                        </div>
                        <div className="space-y-3 w-full">
                            <div className="flex items-center lg:space-x-0 space-x-4">
                                <div className="lg:hidden">
                                    <SVGButtonComponent iconStyle='h-6 w-6 text-white'>
                                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                    </SVGButtonComponent>
                                </div>
                                <div className="flex flex-1">
                                    <input className="flex-1 p-2 text-sm rounded-l-sm border-none focus:outline-none" type="text" placeholder="Search for products, brands..." />
                                    <button className="w-fit px-6 bg-gray-250 text-xs text-gray-900">All Departments</button>
                                    <SVGButtonComponent iconStyle='h-4 w-4 text-white' btnStyle="bg-gray-750 rounded-r-sm px-4">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </SVGButtonComponent>
                                </div>
                            </div>
                            <div className="flex divide-x-[1px] divide-gray-300">
                                {buttons.map((button, index) => <button className={`${index === 0 ? 'rounded-l-md' : ''} ${index === buttons.length - 1 ? 'rounded-r-md' : ''} text-xs flex-shrink flex-grow px-3 py-2 bg-gray-250`} key={index}>{button}</button>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:grid grid-cols-4 sides py-4 space-x-2">
                    <div className="col-span-3 h-96 bg-gray-300 shadow lg:ml-[265px]">
                        <Carousel autoPlay={true} showStatus={false} showThumbs={false}>
                            <img className="h-96 w-full object-cover bg-no-repeat" src="placeholder-images/banner-image-1.webp" />
                            <img className="h-96 w-full object-cover bg-no-repeat" src="placeholder-images/banner-image-2.webp" />
                            <img className="h-96 w-full object-cover bg-no-repeat" src="placeholder-images/banner-image-3.webp" />
                        </Carousel>
                    </div>
                    <div className="bg-blue-100 hidden lg:flex shadow-md border-2 border-white items-center overflow-hidden h-20">
                        <div className="bg-blue-250 rounded-full -ml-14 overflow-hidden flex items-center justify-center h-32 w-32">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-16 h-16 bi-truck" viewBox="0 0 16 16">
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                        </div>
                        <div className="p-2 px-4 flex-1">
                            <h1 className="text-sm font-semibold">Where's my order?</h1>
                            <p className="text-xs text-gray-700">Check your delivery or collection status.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeComponent;