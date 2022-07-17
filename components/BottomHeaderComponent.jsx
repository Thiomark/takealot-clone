import SVGButtonComponent from "./SVGButtonComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "providers/AppProvider";

const BottomHeaderComponent = () => {

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
                        <div className={`w-full lg:grid grid-cols-[200px_1.5em_1fr] ${router.pathname.includes('/account/') ? 'grid-rows-1' : 'grid-rows-[1fr_1em_1fr]' }`}>
                            {toggleShopBy && <ul onMouseLeave={closeShopBy} onMouseOver={() => setToggleShopBy(true)} className="bg-white cursor-pointer hidden z-50 lg:block shadow-md overflow-hidden row-start-2 absolute top-11 w-[200px]">
                                {shopByDepartment.map((button, index) => <li key={index} className="py-1 block w-full relative text-xs text-gray-700 px-4 after:content-['>'] after:text-gray-300 after:absolute after:right-2"><a href="#">{button}</a></li>)}
                                <div className="bg-green-500 p-2 text-white text-center uppercase">Daily Deals</div>
                            </ul>}
                            <button onClick={() => {
                                if(router.pathname === '/') return;
                                setToggleShopBy(prev => !prev);
                            }} onMouseLeave={closeShopBy} onMouseOver={() => setToggleShopBy(true)} className={`lg:block ${toggleShopBy ? 'rounded-b-none' : ''} ${router.pathname.includes('/account/') && 'py-2'} hidden border-none text-xs bg-gray-750 text-white rounded`}>Shop by Department</button>
                            {!router.pathname.includes('/account/') && <div className="flex col-start-3 items-center lg:items-stretch lg:space-x-0 space-x-4">
                                <div className="lg:hidden">
                                    <SVGButtonComponent event={() => setIsMenuOpen(true)} iconStyle="h-6 w-6 text-white">
                                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                    </SVGButtonComponent>
                                </div>
                                <div className="flex flex-1">
                                    <input className="flex-1 p-1.5 text-sm px-4 rounded-l-sm border-none focus:outline-none" type="text" placeholder="Search for products, brands..." />
                                    <button className="w-fit px-6 bg-gray-250 text-xs text-gray-900">All Departments</button>
                                    <SVGButtonComponent iconStyle='h-4 w-4 text-white' btnStyle="bg-gray-750 rounded-r-sm px-4">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                    </SVGButtonComponent>
                                </div>
                            </div>}
                            {!router.pathname.includes('/account/') && <div className={`flex ${router.pathname === "/" ? 'col-start-3' : 'col-start-1'} col-end-4 mt-3 lg:mt-0 row-start-3 divide-x-[1px] divide-gray-300`}>
                                {buttons.map((button, index) => <button className={`${index === 0 ? 'rounded-l-md' : ''} ${index === buttons.length - 1 ? 'rounded-r-md' : ''} text-xs flex-shrink flex-grow py-2 px-3 bg-gray-250`} key={index}>{button}</button>)}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomHeaderComponent;