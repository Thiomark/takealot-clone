import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppContext } from 'providers/AppProvider';
import { ProductContext } from 'providers/ProductProvider';
import React, { useContext, useState } from 'react';
import SVGButtonComponent from './SVGButtonComponent';
import TakealotIcon from './TakealotIcon';
import WelcomeComponent from './WelcomeComponent';

const HeaderComponent = () => {

    const router = useRouter();
    const {cart, list} = useContext(ProductContext);
    const {isMenuOpen, setIsMenuOpen} = useContext(AppContext);

    const links = [
        {name: 'Home', url: '/'},
        {name: 'Shop by Category', arrow: true, url: '#'},
        {name: 'Deals', url: '#'},
        {name: 'Orders', url: '#'},
        {name: 'My Account', arrow: true, url: '#'},
        {name: 'Help', url: '/help'}
    ]

    const bottomLinks = [
        {
            name: 'Cart',
            url: '/cart',
            color: 'text-green-700',
            svg: () => (<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>),
            cart: cart.length,
            showCart: true
        },
        {
            name: 'Lists',
            url: '/wishlist',
            color: 'text-red-500',
            svg: () => (<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>)
        }
    ]


    const divider = (sides) => `h-7 hidden md:inline-block w-[1px] bg-gray-200 ${sides ? sides : 'mx-4'}`;

    return (
        <>
            <header className='shadow bg-white'>
                <div className={`fixed z-50 ${isMenuOpen ? 'scale-100' : 'scale-0 delay-500'} bottom-0 top-0 left-0 right-0`} onClick={() => setIsMenuOpen(false)}>
                    <div className={`${isMenuOpen ? 'translate-x-0 shadow-[0_0_0_100vw_rgba(0,0,0,0.7)]' : '-translate-x-full shadow-[0_0_0_100vw_rgba(0,0,0,0)] scale-100'} w-3/5 h-full flex flex-col bg-gray-100 transition duration-500 relative after:content-["x"] after:hover:cursor-pointer after:absolute after:-right-6 after:text-white after:text-2xl`}>
                        <div>
                            <div className='p-4 border-b bg-white'>
                                <TakealotIcon />
                            </div>
                            <div className='bg-white shadow mt-4 text-sm divide-y-[1px] divide-gray-100'>
                                {links.map((item, index) => <button onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(item.url)
                                }} className='block w-full' key={index}>
                                    <span className='p-4 justify-between flex items-center'>
                                        <span>{item.name}</span>
                                        {item.arrow && <span className='text-gray-400'>&rarr;</span>}      
                                    </span>
                                </button>)}
                            </div>
                            <div className='bg-white shadow mt-4 text-sm divide-y-[1px] divide-gray-100'>
                                {bottomLinks.map((item, index) => <Link key={index} href='#'>
                                    <a className='p-4 justify-between flex items-center'>
                                        <div className='flex items-center space-x-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi ${item.color} h-4 w-4 bi-heart-fill`} viewBox="0 0 16 16">
                                                {item.svg()}
                                            </svg>
                                            <span>{item.name}</span>     
                                        </div>
                                        {item.showCart && <span className='text-xs text-gray-400'>{item.cart} Items</span>}
                                    </a>
                                </Link>)}
                            </div>
                        </div>
                        <div className='mt-auto bg-white p-4 flex items-center space-x-4 border-t border-gray-100'>
                            <button className='rounded-full flex items-center space-x-2 bg-blue-450 px-5 py-2 text-white text-sm'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi h-4 w-4 bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                <span>login</span>
                            </button>
                            <button className='text-sm text-blue-450'>Register</button>
                        </div>
                    </div>
                </div>
                <div className='sides flex py-4 items-center justify-between'>
                    <div className='md:hidden'>
                        <SVGButtonComponent event={() => setIsMenuOpen(true)} iconStyle='h-6 z-100 w-6 text-gray-750'>
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </SVGButtonComponent>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <TakealotIcon />
                        <div className='md:flex text-sm items-center hidden'>
                            <Link href="/help">Help</Link>
                            <div className={divider()  + ' hidden md:hidden lg:inline-block'} />
                            <a className='hidden lg:inline'>Sell on Takealot</a>
                        </div>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <div className='md:flex hidden text-sm items-center'>
                            <Link href="/account/login">Login</Link>
                            <div className={divider()} />
                            <Link href="/account/register">Register</Link>
                            <div className={divider()} />
                            <Link href='#'><a className='hidden lg:inline'>Orders</a></Link>
                            <div className={divider() + ' hidden md:hidden lg:inline-block'} />
                            <Link href="#">My Account</Link>
                        </div>
                        <div className='flex items-center'>
                            <SVGButtonComponent extraStyle='md:hidden' iconStyle='h-5 w-5 text-gray-750'>
                                <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
                                <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
                            </SVGButtonComponent>
                            <SVGButtonComponent event={() => router.push('/wishlist')} extraStyle='bg-red-450 hidden md:flex' iconStyle='h-4 w-4 text-white'>
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </SVGButtonComponent>
                            <div className={divider('mx-2')} />
                            <SVGButtonComponent event={() => router.push('/cart')} after={cart.length} spanStyle='ml-1 hidden text-xs md:inline text-white' iconStyle='h-5 w-5 text-gray-750 md:text-white' btnStyle="h-9 w-9 md:w-auto md:px-4 rounded-full p-2 flex items-center justify-center md:bg-green-450">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </SVGButtonComponent>
                        </div>
                    </div>
                </div>
            </header>
            <WelcomeComponent />
        </>
    )
}

export default HeaderComponent